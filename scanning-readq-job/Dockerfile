FROM node:16.16.0

WORKDIR /

RUN wget https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh

RUN chmod +x install.sh && ./install.sh --accept-all-defaults

RUN /root/bin/oci -v

COPY . .

RUN npm install

RUN tar -xvf cls-l64-703-e.tar.gz

RUN ./install-uvscan -y

RUN mv avvdat-10637.zip /usr/local/uvscan/

RUN cd /usr/local/uvscan/ && unzip avvdat-10637.zip

RUN chmod +x scan.sh

CMD [ "node", "index.js" ]
