import React, { useState } from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: () => void;
  isLastPage: boolean;
  'data-username-input'?: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  username,
  setUsername,
  onSubmit,
  isLastPage,
  'data-username-input': dataUsernameInput
}) => {
  const [error, setError] = useState('');
  const maxLength = 20;
  const minLength = 1;

  const handleChange = (value: string) => {
    // 入力制限
    if (value.length > maxLength) return;

    setUsername(value);

    // エラーメッセージのクリア
    if (value.trim()) {
      setError('');
    }
  };

  const validateUsername = (): boolean => {
    if (!username.trim()) {
      setError('ユーザー名を入力してください');
      return false;
    }
    if (username.trim().length < minLength) {
      setError(`ユーザー名は${minLength}文字以上必要です`);
      return false;
    }
    return true;
  };

  return (
    <div
      className="px-0 py-8 sm:p-6 md:p-8 mb-8 border-b border-gray-100"
      {...(dataUsernameInput && { 'data-username-input': true })}
    >
      <div className="text-center mb-8 px-4">
        <h3 className="text-lg font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto mb-4">
          最後に、性格診断と相性診断で使用するユーザー名を入力してください
        </h3>
        <p className="text-sm text-gray-300">
          （1〜{maxLength}文字で入力してください）
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => {
                if (username) validateUsername();
              }}
              placeholder="ユーザー名を入力"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                error ? 'border-red-400' : 'border-white/30'
              } text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-lg transition-colors`}
              maxLength={maxLength}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && isLastPage) {
                  if (validateUsername()) {
                    onSubmit();
                  }
                }
              }}
              autoComplete="off"
              autoFocus={false}
              aria-label="ユーザー名"
              aria-invalid={!!error}
              aria-describedby={error ? 'username-error' : undefined}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {username.length}/{maxLength}
            </div>
          </div>
          {error && (
            <p id="username-error" className="text-red-400 text-sm" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsernameInput;