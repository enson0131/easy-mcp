
/**
 * 请求重试
 */
export const retry = async (fn: () => any, count = 3) => {
    return new Promise(async (resolve, reject) => {
      while (count > 0) {
        try {
          const res = await fn();
          resolve(res);
          break;
        } catch (error) {
          count--;
          if (count === 0) {
            reject(error);
          }
      }
    }});
  }
  
  
  export class AsyncSeriesHook {
    tasks: Function[];
    constructor() {
      this.tasks = [];
    }
  
    next(task: Function) {
      this.tasks.push(task);
      return this;
    }
  
    callAsync(...args: any) {
      const finalCallback = args.pop();
      // @ts-ignore
      const next = (idx: number, lastResult = null) => {
        if (idx === this.tasks.length) {
          finalCallback(lastResult, null);
          return;
        }
        const task = this.tasks[idx];
        task(lastResult, ...args).then(
          (res: any) => {
            next(idx + 1, res);
          },
          (err: any) => finalCallback(null, err),
        );
      };
      next(0);
    }
  
    run(...args: any) {
      return new Promise<any>((resolve, reject) => {
        const finalCallback = (res: any, err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        };
        this.callAsync(...args, finalCallback);
      });
    }
  }
  
  
  // 使用方法
  // const testhook = new AsyncSeriesHook(['param1', 'param2']); // 构造函数里面是参数名称，参数个数任意
  // // lastTaskResult表示上个任务的返回
  // testhook.next(async (lastTaskResult, param1, param2) => {
  //   console.log('任务1', param1, param2);
  //   await Promise.resolve('hook1');
  //   return 'result1';
  // });
  // testhook.next(async (lastTaskResult, param1, param2) => {
  //   console.log('任务2', param1, param2, lastTaskResult);
  //   await Promise.resolve('hook2');
  //   // return Promise.reject('hook2 reject'); // 如果返回reject，则不会往下执行后面的任务
  //   return 'result2';
  // });
  // testhook.next(async (lastTaskResult, param1, param2) => {
  //   console.log('任务3', param1, param2, lastTaskResult);
  //   await Promise.resolve('hook3');
  //   return 'result3';
  // });
  
  // const param1 = { sum: 0 };
  // const param2 = 'test';
  // // param1,param2是传递给各个任务的参数
  // testhook.run(param1, param2).then(
  //   res => {
  //     // res是最后一个任务的返回值
  //     console.log('最终回调', res);
  //   },
  //   err => {
  //     // 如果有任意一个任务失败都会中断后面所有任务的执行，并将错误通过Err跑出
  //     console.log('有错误了。。。', err);
  //   },
  // );
  