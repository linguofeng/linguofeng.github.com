---
layout: "post"
title: "Protocol Buffers"
date: "2016-01-15 12:50"
---

#### > Install

```bash
$ brew install protobuf --universal --c++11 --devel
$ brew install go
$ go get -u github.com/golang/protobuf/protoc-gen-go
$ protoc --version
```

---

#### > Hello

```bash
$ vim proto/hello.proto
```

```protobuf
syntax = "proto3";

package pb;

message Hello {
    string name = 1;
    int64 mobile = 2;
}
```

```bash
$ mkdir pb
$ protoc --proto_path proto --go_out ./pb ./proto/hello.proto
$ vim main.go
```

```go
func main() {
    encode := &pb.Hello{
        Name:"林国锋",
        Mobile: 13800138000,
    }

    // 编码
    out, err := proto.Marshal(encode)
    if err != nil {
        log.Fatal("encode error!!")
    }

    // 解码
    decode := &pb.Hello{}
    if err := proto.Unmarshal(out, decode); err != nil {
        log.Fatal("decode error!!")
    }

    // 转换成json，proto3支持json
    json_str, err := json.MarshalIndent(decode, "", "  ")
    if err != nil {
        log.Fatal("encode error!!")
    }
    fmt.Println(string(json_str))
}
```

```json
{
  "name": "林国锋",
  "mobile": 13800138000
}
```
