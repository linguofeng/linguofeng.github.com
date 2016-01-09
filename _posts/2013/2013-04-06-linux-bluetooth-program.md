---
layout: post
title: 树莓派 Raspberry Pi
description: Raspberry Pi
categories: [archive]
tags: [raspberrypi]
---

<section>
    <div class="page-header">
        <h3>一、依赖库的安装</h3>
    </div>
<pre class="prettyprint">
$ sudo apt-get install bluetooth bluez-utils bluez-compat blueman libbluetooth-dev
</pre>

<pre class="prettyprint">
#include <stdlib.h>
#include <unistd.h>
#include <sys/socket.h>

#include <bluetooth/bluetooth.h>   //蓝牙的3个头文件.
#include <bluetooth/hci.h>
#include <bluetooth/hci_lib.h>

int main ( int argc , char **argv )
{
   inquiry_info *ii = NULL;
   int max_rsp, num_rsp;
   int dev_id, sock, len, flags;
   int i;
   char addr [19] = { 0 };
   char name [248] = { 0 };
   dev_id = hci_get_route (NULL);   //得到本地第一个可用的蓝牙设备

   sock = hci_open_dev(dev_id);    //用打开蓝牙设备.
   if( dev_id<0 || sock < 0) {
       perror("opening socket error") ;
       exit(1) ;
   }
   len = 8 ;
   max_rsp = 255 ;
   flags = IREQ_CACHE_FLUSH;
   ii = (inquiry_info*)malloc (max_rsp* sizeof ( inquiry_info)) ;
   
   printf("start search...\n");
   num_rsp = hci_inquiry(dev_id , len , max_rsp , NULL, &ii , flags) ;   //检索周围是否有设备
   if ( num_rsp < 0 ) perror ("hci_inquiry error") ;
   for ( i = 0 ; i < num_rsp ; i++) {
       ba2str (&(ii+i)->bdaddr , addr ) ;
       memset (name , 0 , sizeof (name)) ;
       if( hci_read_remote_name ( sock , &( ii+i )->bdaddr , sizeof (name) ,
          name , 0) < 0)   //查询设备的友好设备名
          strcpy (name , "[unknown]") ;
       printf ("%s %s \n", addr , name ) ;
   }
   printf("end search.\n");
   free(ii);
   close(sock);
   return 0;
}
</pre>

<pre class="prettyprint">
$ gcc -lbluetooth main.c
</pre>
</section>