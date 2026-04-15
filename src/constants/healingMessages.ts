import type { LocaleCode } from "../i18n/translations";

export interface HealingMessageEntry {
  en: string;
  vi: string;
}

export type HealingMoodKey =
  | "calm_soft"
  | "reflective_rain"
  | "energetic_bright"
  | "romantic_evening"
  | "cloudy_neutral";

export const healingMessages: Record<HealingMoodKey, HealingMessageEntry[]> = {
  calm_soft: [
    {
      en: "You don’t need to fill every silence. Some moments are meant to simply exist.",
      vi: "Bạn không cần lấp đầy mọi khoảng lặng. Có những khoảnh khắc chỉ cần tồn tại là đủ.",
    },
    {
      en: "Let things unfold gently. Not everything needs your control.",
      vi: "Hãy để mọi thứ diễn ra một cách nhẹ nhàng. Không phải điều gì cũng cần bạn kiểm soát.",
    },
    {
      en: "Rest is not a delay. It’s part of the journey.",
      vi: "Nghỉ ngơi không phải là chậm lại. Nó là một phần của hành trình.",
    },
    {
      en: "Soft days are not empty days. They are where you return to yourself.",
      vi: "Những ngày dịu nhẹ không hề trống rỗng. Đó là lúc bạn quay về với chính mình.",
    },
    {
      en: "Breathe slower. The world can wait a little.",
      vi: "Hít thở chậm lại. Thế giới có thể chờ bạn một chút.",
    },
  ],
  reflective_rain: [
    {
      en: "Some clarity only comes when you stop chasing it.",
      vi: "Có những sự rõ ràng chỉ xuất hiện khi bạn ngừng theo đuổi nó.",
    },
    {
      en: "Not every feeling needs fixing. Some just need to be felt.",
      vi: "Không phải cảm xúc nào cũng cần sửa chữa. Có những điều chỉ cần được cảm nhận.",
    },
    {
      en: "Even the quietest storms shape who you become.",
      vi: "Ngay cả những cơn bão lặng nhất cũng đang định hình con người bạn.",
    },
    {
      en: "You’re allowed to sit with your thoughts without solving them.",
      vi: "Bạn có quyền ở bên suy nghĩ của mình mà không cần giải quyết chúng.",
    },
    {
      en: "There is meaning in the pause, even if you don’t see it yet.",
      vi: "Khoảng dừng cũng có ý nghĩa, dù bạn chưa nhận ra.",
    },
  ],
  energetic_bright: [
    {
      en: "You don’t have to be perfect to move forward. Just begin.",
      vi: "Bạn không cần hoàn hảo để tiến lên. Chỉ cần bắt đầu.",
    },
    {
      en: "Today carries more possibility than you think.",
      vi: "Hôm nay chứa nhiều cơ hội hơn bạn tưởng.",
    },
    {
      en: "Let your energy lead, not your doubt.",
      vi: "Hãy để năng lượng dẫn lối, đừng để nghi ngờ giữ chân bạn.",
    },
    {
      en: "Momentum starts with small, honest steps.",
      vi: "Động lực bắt đầu từ những bước nhỏ nhưng chân thật.",
    },
    {
      en: "There’s something waiting for you on the other side of trying.",
      vi: "Luôn có điều gì đó đang chờ bạn ở phía bên kia của việc dám thử.",
    },
  ],
  romantic_evening: [
    {
      en: "Not everything meaningful needs to be loud.",
      vi: "Không phải điều ý nghĩa nào cũng cần phải ồn ào.",
    },
    {
      en: "Some moments are meant to be felt, not explained.",
      vi: "Có những khoảnh khắc chỉ nên cảm nhận, không cần giải thích.",
    },
    {
      en: "You are allowed to slow down and feel something deeply.",
      vi: "Bạn có quyền chậm lại và cảm nhận mọi thứ thật sâu.",
    },
    {
      en: "There is beauty in things that don’t last forever.",
      vi: "Vẻ đẹp đôi khi nằm ở những điều không kéo dài mãi.",
    },
    {
      en: "Let this moment be enough.",
      vi: "Hãy để khoảnh khắc này là đủ.",
    },
  ],
  cloudy_neutral: [
    {
      en: "Not every day needs a clear direction.",
      vi: "Không phải ngày nào cũng cần một hướng đi rõ ràng.",
    },
    {
      en: "Uncertainty doesn’t mean you’re lost.",
      vi: "Mơ hồ không có nghĩa là bạn đang lạc lối.",
    },
    {
      en: "You can move forward, even without knowing everything.",
      vi: "Bạn vẫn có thể tiến lên, dù chưa biết tất cả.",
    },
    {
      en: "There’s quiet strength in simply continuing.",
      vi: "Có một sức mạnh thầm lặng trong việc tiếp tục bước đi.",
    },
    {
      en: "Balance is not stillness. It’s gentle motion.",
      vi: "Cân bằng không phải đứng yên. Đó là chuyển động nhẹ nhàng.",
    },
  ],
};

function normalizeMoodKey(value?: string) {
  return value?.trim().toLowerCase().replace(/[-\s]+/g, "_") ?? "";
}

export function resolveHealingMoodKey(moodKey?: string): HealingMoodKey {
  const normalized = normalizeMoodKey(moodKey);

  if (normalized in healingMessages) {
    return normalized as HealingMoodKey;
  }

  if (
    normalized.includes("calm") ||
    normalized.includes("soft") ||
    normalized.includes("gentle")
  ) {
    return "calm_soft";
  }

  if (
    normalized.includes("rain") ||
    normalized.includes("reflect") ||
    normalized.includes("blue")
  ) {
    return "reflective_rain";
  }

  if (
    normalized.includes("energetic") ||
    normalized.includes("bright") ||
    normalized.includes("sun")
  ) {
    return "energetic_bright";
  }

  if (
    normalized.includes("romantic") ||
    normalized.includes("evening") ||
    normalized.includes("velvet")
  ) {
    return "romantic_evening";
  }

  return "cloudy_neutral";
}

export function getHealingMessageEntry(moodKey?: string) {
  const resolvedKey = resolveHealingMoodKey(moodKey);
  const messages = healingMessages[resolvedKey];

  return messages[Math.floor(Math.random() * messages.length)];
}

export function getHealingMessage(
  moodKey: string | undefined,
  lang: LocaleCode,
) {
  return getHealingMessageEntry(moodKey)[lang];
}
