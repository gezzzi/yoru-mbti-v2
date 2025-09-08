import React from 'react';

interface UsernameInputProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: () => void;
  isLastPage: boolean;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ 
  username, 
  setUsername, 
  onSubmit,
  isLastPage 
}) => {
  return (
    <div className="px-0 py-8 sm:p-6 md:p-8 mb-8 border-b border-gray-100" data-username-input>
      <div className="text-center mb-8 px-4">
        <h3 className="text-lg font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto mb-4">
          最後に、性格診断と相性診断で使用するユーザー名を入力してください
        </h3>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="ユーザー名を入力"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-lg"
            maxLength={20}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && isLastPage && username.trim()) {
                onSubmit();
              }
            }}
            autoComplete="off"
            autoFocus={false}
          />
        </div>
      </div>
    </div>
  );
};

export default UsernameInput;