FROM node:6.6

# prepare a user which runs everything locally! - required in child images!
RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
WORKDIR $HOME

RUN npm install -g angular-cli@1.0.0-beta.10 --silent && npm cache clean

ADD typings /home/app/typings
ADD angular-cli* /home/app/
ADD package.json /home/app
ADD tslint.json /home/app
ADD typings.json /home/app

RUN npm install --silent

#ADD e2e /home/app/e2e
ADD config /home/app/config
ADD src /home/app/src
#ADD test /home/app/test

EXPOSE 4200

ENTRYPOINT ng serve -prod
