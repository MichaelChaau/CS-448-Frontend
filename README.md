# Manage Items Frontend Client and Web Server

> IMPORTANT: This project is not intended for production environments.
> It was built as an educational exercise and is intended to serve as an educational
> example.

## 1. Use

Download and inspect/configure `docker-compose.yaml`.

Start.

```bash
docker-compose up --detach
```

The frontend is now available at http://localhost:8080/ .

Stop.

```bash
docker-compose down
```

## 2. Persistence

Download and inspect/configure `docker-compose.yaml` and `docker-compose.persist.yaml`.

Create the directory listed as the source in `docker-compose.persist.yaml` .

```bash
mkdir -p backend-database
```

Start.

```bash
docker-compose -f docker-compose.yaml -f docker-compose.persist.yaml up --detach
```

The service is now available at http://localhost:8080 , Its data is stored in ./backend-database.

Stop.

```bash
docker-compose -f docker-compose.yaml -f docker-compose.persist.yaml down
```

Start it again with the same command line options as before and its state will pick up where it left off.


## 3. Environment Variables

* BACKEND_BASE_URL - The URL to access the backend server.


## 4. Development

Run using a development web server, the backend server, and its database.

```bash
# dev/up
docker-compose -f docker-compose.dev.yaml up --detach frontend-server
```

Now the frontend is available at http://localhost:8080/ . You can modify
the code in src and refresh your browser without recycling the server.

Stop the servers.

```bash
# dev/down
docker-compose -f docker-compose.dev.yaml down
```

Run using a development web server and a mock server for the backend.

```bash
# mock/up
docker-compose -f docker-compose.mock.yaml up --detach frontend-server
```

Now the backend validates requests and sends syntacticly valid responses
based on the openapi.yaml specification of the REST API. This is handy during
development if part of the interface is not yet implemented, allowing you to
develop the frontend against this mock instead. It may also help isolate bugs.

Stop the servers.

```bash
# mock/down
docker-compose -f docker-compose.mock.yaml down
```

### 4.1. Dependencies

Dependencies are managed in a few different files.

* Dockerfile - Base image for backend.
* docker-compose.* - Contain dependencies as well.

