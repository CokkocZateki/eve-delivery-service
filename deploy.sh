#!/usr/bin/env bash

echo $PRIVATE_SSH_KEY >> /home/.ssh/id_rsa
chmod 0600 /home/.ssh/id_rsa
echo $KNOWN_HOSTS >> /home/.ssh/known_hosts
chmod 0644 /home/.ssh/known_hosts
ssh -o StrictHostKeyChecking=no -i /home/.ssh/id_rsa frontend@139.59.178.23 'time'

#cat /etc/ssh/ssh_config


# /home/.ssh/authorized_keys
# -o StrictHostKeyChecking=no -o LogLevel=error
