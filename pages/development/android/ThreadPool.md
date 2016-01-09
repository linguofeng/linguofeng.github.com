---
layout: default
title: ThreadPool
---

h1. {{ page.title }}

* ThreadPool
<hr />

<pre class="brush: java">
public class ThreadPool {

	private static ThreadPool threadPool;
	private static ThreadPoolExecutor threadPoolExecutor;

	static {
		threadPool = new ThreadPool();
		/**
		 * corePoolSize： 线程池维护线程的最少数量 
		 * maximumPoolSize：线程池维护线程的最大数量
		 * keepAliveTime： 线程池维护线程所允许的空闲时间 
		 * unit： 线程池维护线程所允许的空闲时间的单位 
		 * workQueue：线程池所使用的缓冲队列 
		 * handler： 线程池对拒绝任务的处理策略
		 */
		threadPoolExecutor = new ThreadPoolExecutor(2, 4, 3, TimeUnit.SECONDS,
				new ArrayBlockingQueue<Runnable>(3),
				/**
				 * handler有四个选择： 
				 * 	ThreadPoolExecutor.AbortPolicy()
				 * 		抛出java.util.concurrent.RejectedExecutionException异常
				 * 	ThreadPoolExecutor.CallerRunsPolicy()
				 * 		重试添加当前的任务，他会自动重复调用execute()方法
				 * 	ThreadPoolExecutor.DiscardOldestPolicy() 
				 * 		抛弃旧的任务
				 * 	ThreadPoolExecutor.DiscardPolicy() 
				 * 		抛弃当前的任务
				 */
				new ThreadPoolExecutor.CallerRunsPolicy());
	}

	private ThreadPool() {
	}

	public static ThreadPool getInstance() {
		return threadPool;
	}

	public void addExecute(Runnable r) {
		threadPoolExecutor.execute(r);
	}
}
</pre>