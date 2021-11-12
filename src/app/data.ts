// Where the magic is stored
// I spent a lot of time collecting all of this data and I would appreciate if you don't steal it :)

// Also you may wonder why I use ISRC IDs instead of spotify IDs/URIs:
// It is because the ISRC URI is the same if the audio is the same across different albums from what I can tell (deluxe versions/rep suprise songs),
// whereas spotify ID is different

// Map of ISRC IDs to spotify track URIs
export const MUSIC_MAP: Record<string, string> = {
  // When possible, info is ordered by the order on Taylor's Version

  // To: Fearless (Taylor's Version)
  // From: Fearless Platinum Edition
  USCJY0803332: 'spotify:track:77sMIMlNaSURUAXq5coCxE', // Fearless
  USCJY0803333: 'spotify:track:2nqio0SfWg6gh2eCtfuMa5', // Fifteen
  USCJY0803275: 'spotify:track:6YvqWjhGD8mB5QXcbcUKtx', // Love Story
  USCJY0803323: 'spotify:track:550erGcdD9n6PnwxrvYqZT', // Hey Stephen
  USCJY0803264: 'spotify:track:5YL553x8sHderRBDlm3NM3', // White Horse
  USCJY0803328: 'spotify:track:1qrpoAMXodY6895hGKoUpA', // You Belong With Me
  USCJY0803331: 'spotify:track:7HC7R2D8WjXVcUHJyEGjRs', // Breathe
  USCJY0803330: 'spotify:track:0k0vFacOHNuArLWMiH60p7', // Tell Me Why
  USCJY0803334: 'spotify:track:6iiAfo4wTA2CVC3Uwx9uh8', // You're Not Sorry
  USCJY0803327: 'spotify:track:22bPsP2jCgbLUvh82U0Z3M', // The Way I Loved You
  USCJY0803336: 'spotify:track:1msEuwSBneBKpVCZQcFTsU', // Forever & Always
  USCJY0803326: 'spotify:track:6ON9UuIq49xXY9GPmHIYRp', // The Best Day
  USCJY0803274: 'spotify:track:3ExweHKZF9B752DPQByRVT', // Change
  USCJY0903521: 'spotify:track:2m3ObD945KvpE5y9A1eUWm', // Jump Then Fall
  USCJY0903519: 'spotify:track:0tQ9vBYpldCuikPsbgOVKA', // Untouchable
  USCJY0903523: 'spotify:track:01QdEx6kFr78ZejhQtWR5m', // Forever & Always - Piano Version
  USCJY0903520: 'spotify:track:1n2wszmJyVkw6FHqyLnQsY', // Come In With The Rain
  USCJY0903522: 'spotify:track:51A8eKvvZz9uydvIZ7xRSV', // Superstar
  USCJY0803329: 'spotify:track:1cSFlSBdpT4F5vb1frQ231', // The Other Side Of The Door
  // From: Today Was A Fairytale Singles
  USCJY1103825: 'spotify:track:2JoJrsEV15OzbijS47lids', // Today Was A Fairytale
  USCJY0903616: 'spotify:track:2JoJrsEV15OzbijS47lids', // Today Was A Fairytale - US Version

  // To: Red (Taylor's Version) (pending release)
  // From: Red (Deluxe Edition)
  USCJY1231019: 'spotify:track:6lzc0Al0zfZOIFsFvBS1ki', // State Of Grace
  USCJY1231020: 'spotify:track:4OAuvHryIVv4kMDNSLuPt6', // Red
  USCJY1231038: 'spotify:track:3S7HNKPakdwNEBFIVTL6dZ', // Treacherous
  USCJY1231039: 'spotify:track:6AtZLIzUINvExIUy4QhdjP', // I Knew You Were Trouble.
  USCJY1231021: 'spotify:track:3nsfB1vus2qaloUdcBZvDu', // All Too Well
  USCJY1231040: 'spotify:track:3yII7UwgLF6K5zW3xad3MP', // 22
  USCJY1231026: 'spotify:track:2r9CbjYgFhtAmcFv1cSquB', // I Almost Do
  USCJY1231018: 'spotify:track:5YqltLsjdqFtvqE7Nrysvs', // We Are Never Ever Getting Back Together
  USCJY1231023: 'spotify:track:7eQj6r5PIdYKEIZjucBMcq', // Stay Stay Stay
  USCJY1231041: 'spotify:track:0y6kdSRCVQhSsHSpWvTUm7', // The Last Time
  USCJY1231042: 'spotify:track:7J4b3LVCIGO4CMBDFLPoP6', // Holy Ground
  USCJY1231024: 'spotify:track:73qMN9bXy7MSPwwGfH3wQr', // Sad Beautiful Tragic
  USCJY1231043: 'spotify:track:4e5ayHsOLJNLTGfjau2mEw', // The Lucky One
  USCJY1231044: 'spotify:track:7qEUFOVcxRI19tbT68JcYK', // Everything Has Changed
  USCJY1231022: 'spotify:track:7A2cNLRT0YJc1yjxHlKihs', // Starlight
  USCJY1231045: 'spotify:track:05GsNucq8Bngd9fnd4fRa0', // Begin Again
  USCJY1231025: 'spotify:track:0NRHj8hDwwmSPaA41o379r', // The Moment I Knew
  USCJY1231046: 'spotify:track:4pNApnaUWAL2J4KO2eqokq', // Come Back...Be Here
  USCJY1231027: 'spotify:track:0DMVrlMUn01M0IcpDbwgu7', // Girl At Home
  USCJY1231049: 'spotify:track:5jAIouBES8LWMiriuNq170', // State Of Grace - Acoustic
  // From: Ronan Single
  USCJY1231051: 'spotify:track:7nWui6jiMM2m9qFmET1Mtj', // Ronan

  // To: 1989 (Taylor's Version) (eventually...)
  USCJY1431379: 'spotify:track:1Ov37jtRQ2YNAe8HzfczkL', // Wildest Dreams
};
