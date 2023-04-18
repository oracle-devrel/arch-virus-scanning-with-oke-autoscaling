const fdk = require('@fnproject/fdk');
const core = require("oci-core");
const common = require("oci-common");
const queue = require("oci-queue");

fdk.handle(async function(event) {
    
    var res = "";
    var content = "";
    const queueId = process.env.QUEUE;
    const endpoint = process.env.ENDPOINT;
    
    //console.log(event);
    try {
        if(event.data && event.data.resourceName)
        {
            //console.log(event.data.resourceName);
            content = event.data.resourceName;
        }

        const provider = await common.ResourcePrincipalAuthenticationDetailsProvider.builder();
        const qClient = new queue.QueueClient({ authenticationDetailsProvider: provider });
        qClient.endpoint = endpoint;

        console.log("Writing '" + content + "' to Q .. ");
        const putReq = {
          queueId: queueId,
          putMessagesDetails: { messages : [ { content: content } ] }
        };
        
        res = await qClient.putMessages(putReq);  
    } catch (error) {
        console.log("Error: " + error);
        res = "Writeq error " + error + ", queue:" + queueId;
    } finally {
        return res;
    }
})
