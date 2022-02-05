#Buscando imagem Golang Alpine.
FROM golang:alpine AS goBuild

#Informando o diretorio que irei trabalhar
WORKDIR /go/src

#Realizando a copia do meu arquivo hello.go para a pasta /go/src
COPY hello.go /go/src

    #Alterando o GO111MODULE para OFF
RUN go env -w GO111MODULE=off && \
    #Gerando o arquivo binario
    go build -o hello

FROM scratch

#Realizando a copia do arquivo binario para a minha imagem scratch
COPY --from=goBuild /go/src/hello /go/src/hello

#Iniciando o meu arquivo binario go
ENTRYPOINT ["/go/src/hello"]

#Instalar o golang dentro do container para depois copiar os arquivos la dentro
#docker run --rm -it --name golang --mount type=bind,src="$(pwd)"/,target=/go/src golang:latest
