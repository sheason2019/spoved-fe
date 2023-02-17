FROM sheason/nginx:1.23.3-spoved

WORKDIR /code

ADD . .

ENTRYPOINT [ "sh", "/bootstrap-nginx.sh" ]
