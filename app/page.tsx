"use client";

import { useState } from "react";

// なぐさめメッセージの配列
const COMFORT_MESSAGES = [
  "ここに来たってことは、ちゃんと自分を大事にできてるってことです。",
  "今はうまく説明できなくていいです。ここでは言葉が下手でも大丈夫です。",
  "誰にも連絡したくない時に来る場所、ということにしておきましょう。",
  "今日はここまでで十分がんばっています。",
  "寂しいと思えるのは、ちゃんと人とつながりたいって思ってる証拠です。",
];

// 投稿ログの型
type LogItem = {
  id: number;
  body: string;
  time: string;
};

export default function Home() {
  // なぐさめメッセージの状態
  const [currentMessage, setCurrentMessage] = useState(COMFORT_MESSAGES[0]);

  // テキストエリアの入力内容
  const [inputText, setInputText] = useState("");

  // 投稿ログの配列（新しいものが先頭）
  const [logs, setLogs] = useState<LogItem[]>([]);

  // 別のひとことボタンの処理
  const handleChangeMessage = () => {
    const randomIndex = Math.floor(Math.random() * COMFORT_MESSAGES.length);
    setCurrentMessage(COMFORT_MESSAGES[randomIndex]);
  };

  // 投稿ボタンの処理
  const handleSubmit = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeString = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const newLog: LogItem = {
      id: Date.now(),
      body: trimmed,
      time: timeString,
    };

    setLogs([newLog, ...logs]);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Sabi Room
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            寂しい時だけ開く、静かなページです。
          </p>
        </header>

        {/* なぐさめメッセージカード */}
        <section className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
            {currentMessage}
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              onClick={handleChangeMessage}
              className="rounded-full bg-slate-200 px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              別のひとこと
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ここでの言葉は外には送られません
            </p>
          </div>
        </section>

        {/* 投稿（書く）エリア */}
        <section className="mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
          <label className="mb-3 block text-base font-medium text-slate-700 dark:text-slate-200">
            今の気持ちを書いておきますか？
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-slate-50 p-3 text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-slate-500"
            rows={4}
            placeholder="ここに書いた言葉はあなただけのものです..."
          />
          <button
            onClick={handleSubmit}
            className="mt-3 w-full rounded-full bg-slate-600 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            このまま置いておく
          </button>
        </section>

        {/* ログ一覧エリア */}
        <section className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
          <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-slate-100">
            ここに置いていった気持ち
          </h2>

          {logs.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              まだありません。しんどい日だけでいいです。
            </p>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-200">
                    {log.body}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {log.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* フッター */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            local only
          </p>
        </footer>
      </div>
    </div>
  );
}

// 今後足せる拡張
// - localStorageへの保存
// - メッセージをもっと増やして「カテゴリー（励まし・共感・現実的アドバイス）」で切り替え
// - 背景に時間帯で変わるグラデーション
// - 「いま寂しいひとが何人いる風」に見せるダミーカウンタ
