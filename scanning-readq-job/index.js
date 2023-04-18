const queue = require("oci-queue");
const core = require("oci-core");
const common = require("oci-common");
const os = require("oci-objectstorage");
const loggingingestion = require("oci-loggingingestion");
const { exec } = require("child_process");
const util = require('util');

const queueId = process.env.QUEUE;
const endpoint = process.env.ENDPOINT;
const logId = process.env.LOG;
var provider;
var qClient;
var oClient;
var lClient;

async function readQ() {
    try {
        var scan = util.promisify(require('child_process').exec);
        var getReq = {
          queueId: queueId,
          timeoutInSeconds: 5
        };
        console.log("Job reading from Q ..");
        var getRes = await qClient.getMessages(getReq).catch(error => {
            console.log(error);
        });
        if(getRes && getRes.getMessages && getRes.getMessages.messages.length)
        {
            getRes.getMessages.messages.forEach(async function(msg) {
                var cmd = "scan";
                if(msg.content.includes("/")) {
                    console.log("Just deleting file " + msg.content);    
                    cmd = "delete";
                } else {
                    console.log("Scanning " + msg.content);   
                }
                await scan("./scan.sh " + msg.content + " " + cmd, async function(error, stdout, stderr) {
                    if(error) if(stdout) writeLog(msg.content, "Scanning error " + msg.content , error);
                    //if(stderr) console.log(stderr);
                    if(stdout) console.log(stdout.substring(stdout.indexOf('#################'), stdout.indexOf('#################') + 76));
                    if(stdout) writeLog(msg.content, "Scanning " + msg.content, stdout.substring(stdout.indexOf('#################'), stdout.indexOf('#################') + 76));
                    var delReq = {
                          queueId: queueId,
                          messageReceipt: msg.receipt
                    };
                    await qClient.deleteMessage(delReq).catch(error => {
                        console.log(error);
                    });
                    readQ();
                });
            });
        } else {
            console.log("Q empty - finishing up ");
            process.exit();   
        }
    } catch (error) {
        console.log("ReadQ error: " + error);
    } finally {
    }
}

async function writeLog(subject, type, data)
{
  try {
        const putLogsDetails = {
          specversion: "1.0",
          logEntryBatches: [
            {
              entries: [
                {
                  id: "scanning-readq-job " + subject,
                  data: data
                }
              ],
              source: "OKE scanning-readq-job",
              type: type,
              subject: subject
            }
          ]
        };
        var putLogsRequest = loggingingestion.requests.PutLogsRequest = {
          logId: logId,
          putLogsDetails: putLogsDetails,
          timestampOpcAgentProcessing: new Date()
        };
        const putLogsResponse = await lClient.putLogs(putLogsRequest);
  } catch (err) {
    console.error('Log error: ' + err.message);
  }
}

async function init() {
  try {
    provider = await new common.InstancePrincipalsAuthenticationDetailsProviderBuilder().build();
      
    lClient = new loggingingestion.LoggingClient({ authenticationDetailsProvider: provider });
    writeLog("Job started", "Job started for scanning" , "Job started for scanning");
      
    oClient = new os.ObjectStorageClient({
      authenticationDetailsProvider: provider
    });
    qClient = new queue.QueueClient({
      authenticationDetailsProvider: provider
    });
    qClient.endpoint = endpoint;
    readQ();
  } catch (err) {
    console.error('Queue init() error: ' + err.message);
  }
}

init();
