# Socket.io-Express-ACR122u
Workers presence control - Node js

Instale o driver para o dispositivo de leitura ACR122u:

http://www.acs.com.hk/download-driver-unified/6258/ACS-Unified-Driver-Lnx-Mac-108-P.zip.unzip

— Instalação do Driver do fornecedor ACS —

Após baixar o pacote zipado descompacte seguindo os passos abaixo:

~$ ls // para visualizar a pasta ACS-Unified-Driver-x.x.x // algo parecido com isso, os “x” no final representa a versão que você acabou de baixar

~$ cd ACS-Unified-Driver-x.x.x // digite cd e o nome da pasta para acessar-la

~$ ls // para visualizar os arquivos dentro da pasta

acsccid-x.y.z.tar.bz2 // x.y.z representam os números logo após o nome do arquivo

~$ tar -jxvf acsccid-x.y.z.tar.bz2 // digite e tecle enter para descompactar o arquivo

~$ cd acsccid-x.y.z // para acessar a pasta que foi descompactada

Após acessar a pasta digite os comandos abaixo para instalar o driver

~$ ./configure

~$ make

~$ make install

A instalação leva alguns minutos.

Agora será necessário configurar o arquivo libccid_info.plist no diretorio cd /etc

~$ cd

~$ cd /etc

~$ sudo nano libccid_info.plist

Encontre e altere a a seguinte linha no arquivo:

ifDriverOptions 0x0000

para

ifDriverOptions 0x0001

Ctrl + x e depois pressione y para salvar!

~$ cd // para retornar a pasta raiz (/home/pi..)

Agora vamos instalar nfc-tools, para isso siga os passos abaixo:

~$ wget https://bintray.com/artifact/download/nfc-tools/sources/libnfc-1.7.1.tar.bz2

~$ tar xjf libnfc-1.7.1.tar.bz2

~$ cd libnfc-1.7.1

~$ ./configure –with-drivers=all –prefix=/usr –sysconfdir=/etc

~$ make

~$ sudo make install

Agora vamos configurar o arquivo blacklist.conf

~$ cd // para retornar a pasta raiz (/home/pi..)

~$ sudo nano /etc/modprobe.d/blacklist.conf

digite os códigos a seguir:

blacklist pn533

blacklist nfc

Ctrl + x e depois pressione y para salvar!

~$ sudo modprobe -r pn533 nfc

~$ sudo reboot

Para verificar se tudo deu certo até aqui digite:

~$ sudo nfc-list // deve parecer o seu leito ACR122u

~$ nfc-scan-device -v

Instale o MYSQL e PHPMYADMIN

Faca o dawnload dos arquivos e instale usano o npm  install.

Apos instalado execute npm start e abra o seu navegador em http://localhost:3000

Acredito que tudo tenha dado certo!
Abraco e ate mais!
