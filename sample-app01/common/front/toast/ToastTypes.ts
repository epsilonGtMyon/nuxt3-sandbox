/**
 * トーストの種類
 */
type ToastType = "info" | "warn" | "error";

/**
 * トースト表示のパラメータ
 */
type ToastParameter = {
  /** トーストの種類 */
  toastType: ToastType;
  /** メッセージ */
  message: string;
  /** 表示時間 -1 は無限 */
  duration: number;
  /** トーストの紐づくスコープ */
  scope: Symbol;
  /** スコープ廃棄時に閉じるか */
  closeOnScopeDestroyed: boolean;
};

type ToastElementRecord = ToastParameter & {
  /** トーストのID */
  id: string;

  /** トーストが自然に閉じる場合のタイマーID */
  timerId: number;
}

/**
 * トーストのハンドル
 */
type ToastHandle = {
  show(param: ToastParameter): void;
  closeAll(): void;
  closeScope(scope: ToastParameter["scope"]): void;
};

export type { ToastType, ToastParameter, ToastElementRecord, ToastHandle };
