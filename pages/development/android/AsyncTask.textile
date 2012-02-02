---
layout: default
title: Android AsyncTask 异步任务
---

h1. {{ page.title }}

* *创建*
<hr />

<pre class="brush: java">
private class DownloadFilesTask extends AsyncTask<URL, Integer, Long> {
    // 后台任务（子线程）
    protected Long doInBackground(URL... urls) {
        int count = urls.length;
        long totalSize = 0;
        for (int i = 0; i < count; i++) {
            totalSize += Downloader.downloadFile(urls[i]);
            // 执行onProgressUpdate()方法
            publishProgress((int) ((i / (float) count) * 100));
        }
        return totalSize;
    }
    
    // 更新进度（主线程）
    protected void onProgressUpdate(Integer... progress) {
        setProgressPercent(progress[ ]);
    }
    
    // 完成（主线程）
    protected void onPostExecute(Long result) {
        showDialog("Downloaded " + result + " bytes");
    }
 }
</pre>

* *使用*
<hr />

<pre class="brush: java">
new DownloadFilesTask().execute(url1, url2, url3);
</pre>

p. 更多参数访问 "http://developer.android.com/reference/android/os/AsyncTask.html":http://developer.android.com/reference/android/os/AsyncTask.html