export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  mood?: string;
  theme: string;
  tags: string[];
  isFavorite: boolean;
}

export const mockEntries: JournalEntry[] = [
  {
    id: "1",
    title: "A Walk Through the Autumn Leaves",
    content: `<h2>Golden Mornings</h2><p>Today was one of those rare, perfect autumn days. The kind where the sunlight filters through golden-orange canopies and paints everything in warm amber tones.</p><p>I walked through the old park near the river, the one with the <strong>ancient oak trees</strong> that have stood there for centuries. The crunch of dried leaves beneath my feet was oddly satisfying — a natural percussion section to the symphony of birdsong overhead.</p><blockquote><p>"Autumn is a second spring when every leaf is a flower." — Albert Camus</p></blockquote><p>I brought my camera but ended up putting it away after a few shots. Some moments are better experienced than captured. The way the light danced on the water, the cool breeze carrying the scent of damp earth — these things resist being frozen into pixels.</p><h3>Things I noticed:</h3><ul><li>A family of ducks teaching their young to swim</li><li>An old couple sitting on their usual bench, sharing a thermos</li><li>The first frost forming on the edges of fallen leaves</li></ul><p>I think I'll make this a weekly ritual. There's something healing about walking without a destination.</p>`,
    createdAt: "2026-03-14T10:30:00Z",
    updatedAt: "2026-03-14T11:45:00Z",
    mood: "🍂",
    theme: "forest",
    tags: ["nature", "reflection", "walks"],
    isFavorite: true,
  },
  {
    id: "2",
    title: "Midnight Thoughts on Creativity",
    content: `<h2>When the World Sleeps</h2><p>It's 2 AM and I can't sleep. But not in a bad way — my mind is alive with ideas tonight. There's something about the <em>silence of midnight</em> that unlocks a different kind of thinking.</p><p>I've been reading about how great artists and writers often did their best work in the small hours. Maybe there's truth to it. With no notifications, no expectations, no noise — just me and my thoughts.</p><p>I started sketching out ideas for a new project. Nothing concrete yet, just fragments:</p><ol><li>A photography series capturing urban loneliness</li><li>A short story about parallel lives</li><li>An app that helps people journal their dreams</li></ol><p>The <mark>dream journal app</mark> idea excites me the most. What if you could record voice notes the moment you wake up, and AI could help you find patterns in your dreams over time?</p><p>I need to sleep, but I also don't want to lose this momentum. Writing this down so morning-me doesn't forget.</p>`,
    createdAt: "2026-03-13T02:00:00Z",
    updatedAt: "2026-03-13T02:30:00Z",
    mood: "🌙",
    theme: "midnight",
    tags: ["creativity", "ideas", "late-night"],
    isFavorite: false,
  },
  {
    id: "3",
    title: "Recipe: Grandma's Butterscotch Pudding",
    content: `<h2>A Taste of Home</h2><p>Called Grandma today and she finally shared her <strong>secret butterscotch pudding recipe</strong>. The one that everyone asks about at family gatherings. Writing it down before I forget a single detail.</p><h3>Ingredients</h3><ul><li>1 cup dark brown sugar, packed</li><li>¼ cup cornstarch</li><li>¼ teaspoon sea salt</li><li>2½ cups whole milk</li><li>2 large egg yolks</li><li>3 tablespoons unsalted butter</li><li>2 teaspoons pure vanilla extract</li><li>A pinch of love (her words, not mine 😄)</li></ul><h3>The Secret</h3><p>She said the key is <mark>patience with the caramel</mark>. You have to let the brown sugar cook just past the point where you think it's about to burn. That's where the deep, complex flavor comes from.</p><p>Also, real butter. Never margarine. "You can taste the difference," she said, and she's absolutely right.</p><p>Making it this weekend. Will update with photos.</p>`,
    createdAt: "2026-03-12T16:45:00Z",
    updatedAt: "2026-03-12T17:15:00Z",
    mood: "🍮",
    theme: "sunset",
    tags: ["recipe", "family", "cooking"],
    isFavorite: true,
  },
  {
    id: "4",
    title: "Learning to Let Go",
    content: `<p>Some days are harder than others. Today was one of those days where everything felt heavy, and I couldn't pinpoint exactly why.</p><p>But I'm learning that it's okay. Not every day needs to be productive. Not every moment needs to be optimized. Sometimes you just need to sit with the discomfort and let it pass through you.</p><p>Read a passage today that resonated:</p><blockquote><p>"The only way out is through."</p></blockquote><p>So I'm going through. One breath at a time.</p><p>Tomorrow will be different. It always is.</p>`,
    createdAt: "2026-03-11T20:00:00Z",
    updatedAt: "2026-03-11T20:20:00Z",
    mood: "🌊",
    theme: "ocean",
    tags: ["mental-health", "growth", "reflection"],
    isFavorite: false,
  },
  {
    id: "5",
    title: "Startup Ideas Brainstorm",
    content: `<h2>Q2 Ideas Sprint</h2><p>Spent the afternoon at the coffee shop with my notebook, brainstorming startup ideas. Here's what I came up with:</p><h3>1. Smart Bookshelf</h3><p>An app that scans your physical bookshelf, catalogs your books, and recommends your next read based on what you own but haven't read yet.</p><h3>2. Neighborhood Exchange</h3><p>A hyperlocal marketplace for borrowing things from neighbors. Why buy a drill you'll use once when the person next door already has one?</p><h3>3. Focus Timer with Stakes</h3><p>A productivity timer where you put money on the line. If you break focus, your stake goes to charity. <strong>Accountability through consequences.</strong></p><p>Going to prototype #3 this weekend. It feels the most <em>immediately buildable</em>.</p>`,
    createdAt: "2026-03-10T14:00:00Z",
    updatedAt: "2026-03-10T15:30:00Z",
    mood: "💡",
    theme: "lavender",
    tags: ["business", "ideas", "startup"],
    isFavorite: true,
  },
];
