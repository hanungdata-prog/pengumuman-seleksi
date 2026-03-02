# Countdown Sound Files

You need to add 5 MP3 files to this folder:

1. `countdown-5.mp3` - Voice saying "Five"
2. `countdown-4.mp3` - Voice saying "Four"
3. `countdown-3.mp3` - Voice saying "Three"
4. `countdown-2.mp3` - Voice saying "Two"
5. `countdown-1.mp3` - Voice saying "One"

## Where to get the files:

You can download free countdown sounds from:
- [Freesound.org](https://freesound.org/search/?q=countdown+english)
- [Zapsplat](https://www.zapsplat.com/music/countdown-sounds/)
- [Mixkit](https://mixkit.co/free-sound-effects/countdown/)

Or generate them using Text-to-Speech (TTS) services like:
- [Google Text-to-Speech](https://cloud.google.com/text-to-speech)
- [Amazon Polly](https://aws.amazon.com/polly/)
- [NaturalReaders](https://www.naturalreaders.com/online/)

## Alternative: Remove sound feature

If you don't want sound, you can remove the audio code from `src/App.tsx`:

```typescript
const handleOpenCurtain = () => {
  setCurtainStage('opening')
  setTimeout(() => {
    setCurtainStage('open')
    if (result?.status === 'diterima') {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
    }
  }, 6000) // Wait for countdown animation
}
```
