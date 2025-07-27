export type PositionMood = 'romantic' | 'wild' | 'playful' | 'technical' | 'foreplay';

export interface Position48 {
  id: number;
  name: string;
  kana: string;
  description?: string;
  moods: PositionMood[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const positions48: Position48[] = [
  { id: 1, name: 'うしろやぐら', kana: 'うしろやぐら', moods: ['wild'], difficulty: 'easy', description: '女性が体育座りをして、男性が後ろから抱きかかえるように座る。女性の両足を持ち上げて膝を胸に近づけることで深い結合が可能。背中を預けられるので女性は楽な姿勢。' },
  { id: 2, name: 'つり橋', kana: 'つりばし', moods: ['technical', 'wild'], difficulty: 'hard', description: '女性が仰向けになり、腰を高く持ち上げてブリッジのような姿勢を作る。男性は立った状態で女性の腰を支えながら結合。女性の柔軟性と男性の支える力が必要な上級体位。' },
  { id: 3, name: '寄り添い', kana: 'よりそい', moods: ['romantic', 'foreplay'], difficulty: 'easy', description: '二人とも横向きに寝て、男性が女性の背後から抱きしめる。女性は少し腰を後ろに突き出すことで結合しやすくなる。ゆったりとした動きで長時間楽しめる体位。' },
  { id: 4, name: '撞木ぞり', kana: 'しゅもくぞり', moods: ['technical', 'wild'], difficulty: 'hard', description: '女性が仰向けで両脚を大きく開いてM字型にし、男性が正面から深く結合。女性の脚を男性の肩に乗せることでより深い角度での挿入が可能。柔軟性が求められる。' },
  { id: 5, name: '獅子舞', kana: 'ししまい', moods: ['technical'], difficulty: 'hard', description: '女性が四つん這いになり、男性が後ろから覆いかぶさるように結合。男性は女性の腰をしっかりと掴み、獅子が舞うような激しい動きで刺激を与える。' },
  { id: 6, name: '菊一文字', kana: 'きくいちもんじ', moods: ['wild', 'technical'], difficulty: 'medium', description: '女性が四つん這いになり、男性が後ろから結合。女性は両腕で上半身を支え、腰を高く上げることで角度を調整。深い挿入と強い刺激が特徴。' },
  { id: 7, name: 'こたつがかり', kana: 'こたつがかり', moods: ['playful', 'romantic'], difficulty: 'easy', description: 'こたつの中で座位を行う体位。女性が上に座り、コタツ布団をかけたまま動く。寒い季節に暖かく密着しながら愛し合えるのが特徴。' },
  { id: 8, name: 'テコがかり', kana: 'てこがかり', moods: ['technical'], difficulty: 'hard', description: '女性が仰向けになり、男性が女性の両脚を持ち上げて肩に担ぐような体勢。テコの原理で女性の腰を支点にして動く。男性の体力が必要な上級体位。' },
  { id: 9, name: '岩清水', kana: 'いわしみず', moods: ['foreplay', 'wild'], difficulty: 'easy', description: '女性が仰向けで両脚を上げ、男性が跨いで上から愛撫しながら結合。水が流れるようなゆったりとしたリズムで動くのが特徴。愛撫と挿入を同時に楽しめる。' },
  { id: 10, name: '時雨茶臼', kana: 'しぐれちゃうす', moods: ['romantic', 'playful'], difficulty: 'easy', description: '男性が仰向けになり、女性が上にまたがる騎乗位。女性は腰を円を描くように回しながら、茶臼を挽くような動きをする。女性がリードできる体位。' },
  { id: 11, name: '理非知らず', kana: 'りひしらず', moods: ['wild', 'technical'], difficulty: 'hard', description: '女性が仰向けで両脚を男性の首に巻き付け、男性は立ったまま激しく結合。女性の柔軟性と男性の体力が必要な激しい体位。' },
  { id: 12, name: '茶臼のばし', kana: 'ちゃうすのばし', moods: ['romantic'], difficulty: 'easy', description: '騎乗位の変形で、女性が上になり両脚を真っすぐ伸ばしてリラックスした状態。互いの表情を見ながらゆったりと愛し合える。' },
  { id: 13, name: 'こたつ隠れ', kana: 'こたつがくれ', moods: ['playful'], difficulty: 'easy', description: 'こたつの中で布団をかぶったまま横向きに寝そべり、後ろから結合。秘密の遊びのような雰囲気で、暖かさを保ちながら楽しめる。' },
  { id: 14, name: '乱れ牡丹', kana: 'みだれぼたん', moods: ['wild', 'playful'], difficulty: 'medium', description: '女性が仰向けで脚を開き、男性が正常位から様々な角度やリズムで変化をつけながら結合。自由で情熱的な動きが特徴。' },
  { id: 15, name: '帆かけ茶臼', kana: 'ほかけちゃうす', moods: ['technical', 'romantic'], difficulty: 'medium', description: '騎乗位から女性が体を後ろにそらし、手を男性の脚について支える。帆かけ船のように体をそらせることで新しい角度の刺激が得られる。' },
  { id: 16, name: '本駒駆け', kana: 'ほんこまがけ', moods: ['wild', 'playful'], difficulty: 'medium', description: '女性が四つん這いになり、男性が後ろから激しくリズミカルに結合。駒が駆けるような速いテンポと変化に富んだ動きが特徴。' },
  { id: 17, name: '百閉', kana: 'ひゃくへい', moods: ['romantic', 'playful'], difficulty: 'easy', description: '対面座位で、女性が男性の上に座り、正面から抱き合うように密着。お互いの目を見つめ合いながら、ゆったりと愛し合える親密な体位。' },
  { id: 18, name: '雁が首', kana: 'かりがくび', moods: ['foreplay'], difficulty: 'easy', description: '女性がうつ伏せになり、男性が上から覆いかぶさるようにして全身を愛撫。雁が首を伸ばすような優雅な動きで、じっくりと感度を高める。' },
  { id: 19, name: 'しがらみ', kana: 'しがらみ', moods: ['romantic'], difficulty: 'easy', description: '横向きに寝て対面し、お互いの脚を絡ませて結合。正面から抱き合いながら、脚も絡み合わせることで全身で愛を感じ合える。' },
  { id: 20, name: '二つ巴', kana: 'ふたつともえ', moods: ['foreplay', 'playful'], difficulty: 'medium', description: '互いに逆方向を向いて横になり、同時に愛撫し合う6・9の体位。お互いが平等に快感を与え合えるのが特徴。' },
  { id: 21, name: '御所車', kana: 'ごしょぐるま', moods: ['playful', 'technical'], difficulty: 'hard', description: '女性が男性の上に座り、前後ではなく左右に車輪のように回転する動きをする。バランス感覚と体幹の力が必要な高度な技巧。' },
  { id: 22, name: '松葉崩し', kana: 'まつばくずし', moods: ['romantic', 'technical'], difficulty: 'medium', description: '女性が仰向けで片脚を高く上げ、男性が横から結合。松葉が交差するような脚の形が特徴。角度を調整することで刺激を変化させられる。' },
  { id: 23, name: '碁盤攻め', kana: 'ごばんぜめ', moods: ['wild'], difficulty: 'easy', description: '女性が四つん這いになり、男性が後ろからしっかりと腰を掴んでコントロール。主導権を完全に握って、強く激しい刺激を与える体位。' },
  { id: 24, name: '首引き恋慕', kana: 'くびひきれんぼ', moods: ['wild', 'technical'], difficulty: 'hard', description: '女性が四つん這いになり、男性が後ろから女性の首元を優しく引き寄せながら結合。首への刺激で感度が高まる上級技巧。' },
  { id: 25, name: '絞り扶養', kana: 'しぼりふよう', moods: ['wild', 'playful'], difficulty: 'medium', description: '騎乗位で女性が上になり、男性の手を握って絞るように動く。お互いの手を握り合うことで密着感を高めながら刺激を楽しむ。' },
  { id: 26, name: '仏壇返し', kana: 'ぶつだんがえし', moods: ['wild', 'technical'], difficulty: 'medium', description: '女性が仰向けで両脚を高く上げ、膝を胸に近づけるように折り曲げる。男性は正面から深く結合し、強い刺激を与える。' },
  { id: 27, name: '手懸け', kana: 'てがけ', moods: ['playful', 'romantic'], difficulty: 'easy', description: '横向きに寝て、女性が片脚を上げて男性の腰にかける。手を繋ぎながらゆったりと動くことで、親密さを感じながら愛し合える。' },
  { id: 28, name: '椋鳥', kana: 'むくどり', moods: ['foreplay'], difficulty: 'medium', description: '女性がうつ伏せになり、腰を高く上げて鳥のような姿勢を作る。男性は後ろから全身を愛撫しながらジックリと結合する。' },
  { id: 29, name: '窓の月', kana: 'まどのつき', moods: ['romantic'], difficulty: 'easy', description: '横向きに寝て、女性が前で男性が後ろから抱きしめる。窓辺で月光を浴びながら、ロマンチックに愛し合う雰囲気を大切にする体位。' },
  { id: 30, name: '鳴門', kana: 'なると', moods: ['wild', 'playful'], difficulty: 'medium', description: '女性が男性の上に座り、激しく渦を巻くように回転する動きをする。鳴門の渦潮のような激しさと変化に富んだ刺激が特徴。' },
  { id: 31, name: 'しめ小股', kana: 'しめこまた', moods: ['romantic', 'technical'], difficulty: 'medium', description: '女性が仰向けで脚を閉じたまま結合し、太ももで締め付けるようにして刺激を高める。締まった感覚が独特の快感を生む。' },
  { id: 32, name: '千鳥', kana: 'ちどり', moods: ['technical'], difficulty: 'hard', description: '女性が横向きになり、男性が女性の脚の間に入る複雑な体位。千鳥が飛ぶような優雅で複雑な動きが求められる上級技巧。' },
  { id: 33, name: '抱き上げ', kana: 'だきあげ', moods: ['wild'], difficulty: 'medium', description: '男性が立った状態で女性を抱き上げ、空中で結合する。女性は男性の首にしがみつき、脚を腰に巻き付ける。男性の体力が必要。' },
  { id: 34, name: '流鏑馬', kana: 'やぶさめ', moods: ['wild', 'playful'], difficulty: 'medium', description: '女性が四つん這いになり、男性が後ろから勢いよく突き進む。流鏑馬のような勢いとスピード感のある激しい動きが特徴。' },
  { id: 35, name: '立ち鼎', kana: 'たちかなえ', moods: ['technical', 'wild'], difficulty: 'hard', description: '二人とも立った状態で、女性が片脚を高く上げて男性の肩にかける。鼎のように三点でバランスを取る難しい立ち位。' },
  { id: 36, name: '鵯越え', kana: 'ひよどりごえ', moods: ['wild'], difficulty: 'easy', description: '女性が四つん這いになり、男性が後ろから勢いよく結合。鵯が山を越えるような力強い動きで、深い挿入が可能。' },
  { id: 37, name: '達磨返し', kana: 'だるまがえし', moods: ['technical', 'romantic'], difficulty: 'medium', description: '女性が仰向けで腰を高く上げ、男性が支えながら結合。達磨のように丸く動くことで、様々な角度からの刺激を楽しめる。' },
  { id: 38, name: '千鳥の曲', kana: 'ちどりのきょく', moods: ['foreplay'], difficulty: 'easy', description: '横向きに寝て、お互いの体を指や舌でじっくりと愛撫し合う。千鳥が曲を奏でるような優雅で繊細な動きで、感度をじっくり高める。' },
  { id: 39, name: '抱き地蔵', kana: 'だきじぞう', moods: ['romantic'], difficulty: 'easy', description: '対面座位で、お互いに抱きしめ合いながら結合。地蔵菩薩のように慈悲深く優しく抱き合うことで、精神的な繋がりを深める。' },
  { id: 40, name: '浮き橋', kana: 'うきはし', moods: ['technical', 'romantic'], difficulty: 'medium', description: '女性が仰向けで腰を高く浮かせ、橋のようなアーチを作る。男性は膝立ちで支えながら結合。角度を調整することで様々な刺激を得られる。' },
  { id: 41, name: '立ち松葉', kana: 'たちまつば', moods: ['technical'], difficulty: 'hard', description: '二人とも立った状態で、女性が片脚を上げて松葉のようなV字を作る。柔軟性とバランス感覚が必要な高難度の立ち位。' },
  { id: 42, name: '鵯越えの逆落とし', kana: 'ひよどりごえのさかおとし', moods: ['foreplay', 'technical'], difficulty: 'hard', description: '女性が逆立ちのような姿勢を取り、男性が支えながら結合。逆さまの体勢からの独特な刺激が得られる超上級技巧。' },
  { id: 43, name: '燕返し', kana: 'つばめがえし', moods: ['technical', 'wild'], difficulty: 'medium', description: '女性が脚を高く上げ、燕が飛ぶように素早く体勢を変えながら結合。流れるような動きと変化が特徴的。' },
  { id: 44, name: '宝船', kana: 'たからぶね', moods: ['technical', 'playful'], difficulty: 'medium', description: '女性が仰向けで両脚を男性の肩にかけ、宝船のように豊かな快感を運ぶ。深い結合と遊び心を両立できる体位。' },
  { id: 45, name: '押し車', kana: 'おしぐるま', moods: ['wild', 'technical'], difficulty: 'hard', description: '女性が四つん這いになり、男性が女性の脚を持ち上げて車を押すように前進。男性が完全に主導権を握る激しい体位。' },
  { id: 46, name: '深山', kana: 'みやま', moods: ['wild', 'romantic'], difficulty: 'medium', description: '女性が仰向けで脚を大きく開き、男性が深く結合。深山のように深く神秘的な快感を探求できる体位。' },
  { id: 47, name: '立ち花菱', kana: 'たちはなびし', moods: ['foreplay', 'technical'], difficulty: 'medium', description: '立った状態で女性が片脚を上げ、花菱のような美しいシルエットを作る。立ち位で愛撫と結合を同時に楽しめる。' },
  { id: 48, name: '鶯の谷渡り', kana: 'うぐいすのたにわたり', moods: ['foreplay', 'romantic'], difficulty: 'easy', description: '鶯が谷を渡るように、ジックリと時間をかけて愛撫し合う。勢いよりも繊細さを重視し、感度を徹底的に高める前戯特化の体位。' }
];

export const getPositionsByMood = (mood: PositionMood): Position48[] => {
  return positions48.filter(pos => pos.moods.includes(mood));
};

export const moodDescriptions: Record<PositionMood, string> = {
  'romantic': 'ロマンチック系 - 密着感と愛情を重視',
  'wild': 'ワイルド系 - 激しさと征服感を追求',
  'playful': '遊び心系 - 楽しさと新鮮さを演出',
  'technical': 'テクニカル系 - 技巧と刺激を追求',
  'foreplay': '愛撫系 - じっくりと感じ合う'
};