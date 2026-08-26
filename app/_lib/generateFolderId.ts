const KOREAN_TO_ENGLISH: Record<string, string> = {
  개발: "dev",
  디자인: "design",
  읽을거리: "reading",
  독서: "reading",
  도서: "book",
  업무: "work",
  회사: "company",
  팀: "team",
  개인: "personal",
  일상: "daily",
  취미: "hobby",
  여행: "travel",
  요리: "cook",
  레시피: "recipe",
  맛집: "food",
  음식: "food",
  음악: "music",
  영화: "movie",
  드라마: "drama",
  사진: "photo",
  게임: "game",
  쇼핑: "shop",
  뉴스: "news",
  건강: "health",
  운동: "workout",
  재테크: "finance",
  투자: "invest",
  주식: "stock",
  부동산: "realty",
  육아: "parenting",
  반려동물: "pet",
  강아지: "dog",
  고양이: "cat",
  공부: "study",
  학습: "study",
  교육: "edu",
  프로젝트: "project",
  자료: "docs",
  문서: "docs",
  아이디어: "idea",
  마케팅: "marketing",
  프론트엔드: "frontend",
  백엔드: "backend",
  인공지능: "ai",
  데이터: "data",
  보안: "security",
  클라우드: "cloud",
  미술: "art",
  사업: "biz",
  창업: "startup",
  코딩: "coding",
  알고리즘: "algo",
  레퍼런스: "ref",
  커뮤니티: "community",
  생산성: "productivity",
  유틸리티: "utils",
};

const INITIALS = [
  "g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch", "k", "t", "p", "h",
];
const MEDIALS = [
  "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa",
  "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i",
];
const FINALS = [
  "", "g", "kk", "gs", "n", "nj", "nh", "d", "l", "lg",
  "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s",
  "ss", "ng", "j", "ch", "k", "t", "p", "h",
];

function containsHangul(text: string): boolean {
  return /[가-힣]/.test(text);
}

function romanizeHangul(text: string): string {
  let result = "";
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const initial = Math.floor(offset / (21 * 28));
      const medial = Math.floor((offset % (21 * 28)) / 28);
      const final = offset % 28;
      result += INITIALS[initial] + MEDIALS[medial] + FINALS[final];
    } else {
      result += char;
    }
  }
  return result;
}

function translateKorean(name: string): string {
  const dictHit = KOREAN_TO_ENGLISH[name];
  if (dictHit) return dictHit;

  const tokens = name.split(/[\s/,·-]+/).filter(Boolean);
  const translated = tokens.map((token) =>
    KOREAN_TO_ENGLISH[token] ??
    (containsHangul(token) ? romanizeHangul(token) : token),
  );
  return translated.join("-");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+)|(-+$)/g, "");
}

const MAX_SLUG_LENGTH = 12;

/** 폴더 이름으로부터 짧은 영문 folderId를 만든다. 한글은 사전 매핑 후 미등록 단어는 로마자 표기로 변환하고, 영문은 그대로 축약한다. */
export function generateFolderId(name: string, existingIds: string[]): string {
  const base = containsHangul(name) ? translateKorean(name) : name;

  let slug = slugify(base).slice(0, MAX_SLUG_LENGTH).replace(/-+$/, "");
  if (!slug) slug = "folder";

  let id = slug;
  let suffix = 2;
  while (existingIds.includes(id)) {
    id = `${slug}-${suffix}`;
    suffix += 1;
  }
  return id;
}
