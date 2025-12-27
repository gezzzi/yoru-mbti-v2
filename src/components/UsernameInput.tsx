import React, { useState } from 'react';
import { trackGenderSelect, trackAgeSelect } from '@/utils/analytics';

type Gender = 'male' | 'female' | 'other' | '';

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
  gender: Gender;
  setGender: (value: Gender) => void;
  age: string;
  setAge: (value: string) => void;
  onSubmit: () => void;
  isLastPage: boolean;
  'data-username-input'?: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({
  username,
  setUsername,
  gender,
  setGender,
  age,
  setAge,
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

  const ageOptions = [
    { value: '10代', label: '10代' },
    { value: '20代', label: '20代' },
    { value: '30代', label: '30代' },
    { value: '40代', label: '40代' },
    { value: '50代~', label: '50代〜' },
  ];

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

  const genderOptions = [
    { value: 'male' as Gender, label: '男性', icon: '♂', selectedClass: 'bg-cyan-500 border-cyan-400 text-white' },
    { value: 'female' as Gender, label: '女性', icon: '♀', selectedClass: 'bg-pink-500 border-pink-400 text-white' },
    { value: 'other' as Gender, label: 'その他', icon: '⚧', selectedClass: 'bg-purple-500 border-purple-400 text-white' },
  ];

  return (
    <div
      className="px-0 py-8 sm:p-6 md:p-8 mb-8 border-b border-gray-100"
      {...(dataUsernameInput && { 'data-username-input': true })}
    >
      {/* 性別選択 */}
      <div className="mb-12">
        <div className="text-center mb-6 px-4">
          <h3 className="text-lg font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto mb-2">
            あなたの性別を教えてください
          </h3>
        </div>
        <div className="flex justify-center gap-4">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setGender(option.value);
                trackGenderSelect(option.value);
              }}
              data-gender={option.value}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 flex items-center gap-2 ${
                gender === option.value
                  ? `${option.selectedClass} scale-105 shadow-lg`
                  : 'border-gray-400 bg-gray-800 text-gray-300 hover:border-gray-300 hover:scale-105'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 年齢選択 */}
      <div className="mb-12">
        <div className="text-center mb-6 px-4">
          <h3 className="text-lg font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto mb-2">
            あなたの年齢を教えてください
          </h3>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {ageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setAge(option.value);
                trackAgeSelect(option.value);
              }}
              data-age={option.value}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 ${
                age === option.value
                  ? 'bg-indigo-500 border-indigo-400 text-white scale-105 shadow-lg'
                  : 'border-gray-400 bg-gray-800 text-gray-300 hover:border-gray-300 hover:scale-105'
              }`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ユーザー名入力 */}
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
