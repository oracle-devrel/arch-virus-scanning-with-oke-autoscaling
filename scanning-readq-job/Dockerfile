FROM node:16.16.0

ARG UVSCAN_ARCHIVE=cls-l64-703-e.tar.gz
ARG DAT_FILE=avvdat-10637.zip

WORKDIR /

RUN wget https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh

RUN chmod +x install.sh && ./install.sh --accept-all-defaults

RUN /root/bin/oci -v

COPY . .

RUN npm install

RUN tar -xvf "${UVSCAN_ARCHIVE}"

RUN ./install-uvscan -y

RUN mv "${DAT_FILE}" /usr/local/uvscan/

RUN cd /usr/local/uvscan/ && unzip "${DAT_FILE}"

RUN chmod +x scan.sh

CMD [ "node", "index.js" ]
