import { ToastHandle, ToastParameter } from "./ToastTypes";

/**
 * トーストのコントローラー
 */
class ToastController {
  private handle?: ToastHandle;

  /**
   * 実体を置換します。
   * @param handle トーストの実体ハンドル
   */
  public replaceHandle(handle: ToastHandle): void {
    this.handle = handle;
  }

  /**
   * トーストを表示します。
   * 
   * @param param トーストのパラメーター
   */
  private show(param: ToastParameter) {
    if (this.handle == undefined) {
      throw new Error("handle is null or undefined");
    }

    this.handle.show(param);
  }

  /**
   * INFOトーストを表示します。
   * 
   * @param param トーストのパラメーター
   */
  public info(
    param: Pick<ToastParameter, "message" | "scope" | "closeOnScopeDestroyed">
  ) {
    this.show({
      toastType: "info",
      duration: 5000,
      ...param,
    });
  }

  /**
   * WARNトーストを表示します。
   * 
   * @param param トーストのパラメーター
   */
  public warn(
    param: Pick<ToastParameter, "message" | "scope" | "closeOnScopeDestroyed">
  ) {
    this.show({
      toastType: "warn",
      duration: 5000,
      ...param,
    });
  }

  /**
   * ERRORトーストを表示します。
   * 
   * @param param トーストのパラメーター
   */
  public error(
    param: Pick<ToastParameter, "message" | "scope" | "closeOnScopeDestroyed">
  ) {
    this.show({
      toastType: "error",
      duration: -1,
      ...param,
    });
  }

  /**
   * トーストをすべて閉じます。
   */
  public closeAll() {
    this.handle!.closeAll();
  }

  /**
   * 指定したスコープがのトーストを閉じます。
   * ただしトーストのパラメータがスコープ廃棄時も残り続ける設定の場合は除く
   */
  public closeScope(scope: ToastParameter["scope"]) {
    this.handle!.closeScope(scope);
  }
}

/**
 * ToastControllerを扱いやすくしたもの
 */
class ToastHelper {
  constructor(private controller: ToastController, private scope: Symbol) {}

  /**
   * INFOトーストを表示します。
   * 
   * @param message メッセージ
   * @param closeOnScopeDestroyed スコープ廃棄時にトーストを閉じるか
   */
  public info(message: string, closeOnScopeDestroyed = false) {
    this.controller.info({
      message,
      scope: this.scope,
      closeOnScopeDestroyed,
    });
  }

  /**
   * WARNトーストを表示します。
   * 
   * @param message メッセージ
   * @param closeOnScopeDestroyed スコープ廃棄時にトーストを閉じるか
   */
  public warn(message: string, closeOnScopeDestroyed = false) {
    this.controller.warn({
      message,
      scope: this.scope,
      closeOnScopeDestroyed,
    });
  }

  /**
   * ERRORトーストを表示します。
   * 
   * @param message メッセージ
   * @param closeOnScopeDestroyed スコープ廃棄時にトーストを閉じるか
   */
  public error(message: string, closeOnScopeDestroyed = false) {
    this.controller.error({
      message,
      scope: this.scope,
      closeOnScopeDestroyed,
    });
  }

  /**
   * トーストをすべて閉じます。
   */
  public closeAll() {
    this.controller.closeAll()
  }
}

export { ToastController, ToastHelper };
