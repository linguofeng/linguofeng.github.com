---
layout: post
title: "osx install bind9"
date: "2016-01-10 15:32"
---

由于工作开发过程中使用了Git，Jenkins，Wiki，还有各种web服务，用端口访问的方式太不友好了，所以就利用现有的一台Mac Mini服务器搭了一个域名服务器 `miniserver.io`。

```bash
$ brew install bind
```

```bash
$ vim /usr/local/etc/named.conf

...

zone "miniserver.io" IN {
    type master;
    file "miniserver.io.zone";
    allow-update { none; };
};

zone "10.168.192.in-addr.arpa" IN {
    type master;
    file "miniserver.io.local";
    allow-update { none; };
};

...

```

```bash
$ cd /usr/local/var/named
```

```bash
$ cat << 'EOF' > miniserver.io.zone
$TTL    604800
@                   IN SOA      ns.miniserver.io. root.miniserver.io. (
                                      1       ; Serial
                                      3h      ; Refresh
                                      1h      ; Retry
                                      1w      ; Expire
                                      1h )    ; Minimum
;
miniserver.io.      IN NS       ns.miniserver.io.
miniserver.io.      IN A        192.168.10.100
ns                  IN A        192.168.10.100
www                 IN CNAME    miniserver.io.
EOF
```

```bash
$ cat << 'EOF' > miniserver.io.local
$TTL    604800
@       IN      SOA     ns.miniserver.io. root.miniserver.io.  (
                                      1       ; Serial
                                      3h      ; Refresh
                                      1h      ; Retry
                                      1w      ; Expire
                                      1h )    ; Minimum
;
        IN      NS      ns.

1       IN      PTR     ns.miniserver.io.
EOF
```

```bash
$ sudo named -f -c /usr/local/etc/named.conf
```
