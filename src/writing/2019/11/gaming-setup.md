---
title: "My Gaming Setup"
published: 2019-11-12
---

I have recently rekindled my passion for retro/last gen console gaming and spent quite some time on working on a setup I enjoy. This article is a rundown of the consoles I own and how I get the most out of them.

But first, let me tell you what this article is *not*: Most of my consoles are softmodded and I dumped all my physical games on to them. This blog post is not about piracy, though. I have no interest in either distributing my game dumps or downloading roms from the internet. On the contrary, I am all for buying games and supporting the game developers and studios out there. I simply enjoy tinkering with hardware and enabling my consoles to play as many games as conveniently as possible. And that’s the gist of the following text: <b>Turning game consoles into multi-platform beasts!</b>

This is also not a step-by-step guide to softmod your consoles. If you are interested, please have a look at the list of my [sources](#sources) down below.

A short note to all the Mac users out there: Most if not all the homebrew tools are Windows-only, but don’t get discouraged. So far I managed to get everything working with [VirtualBox](https://www.virtualbox.org/) and an [official Microsoft Windows 10 image](https://www.microsoft.com/en-us/software-download/windows10ISO).

## PSP Go

The PSP Go has been a loyal friend for a very long time, but I have to admit that the PS Vita has taken its spot. Still: I love its design, its portability (unlike the 3DS, Vita, or Switch it *actually* fits into my pocket), the sharp and sufficiently large screen, and its support for a plethora of games.

While I exclusively play on the PSP Go because of the superior form factor, the remainder of this chapter also applies to the PSP 1000/2000/3000/E1000.

![A PSP Go running The Legend of Zelda: The Minish Cap](/images/gaming-setup/pspgo.jpg "A Thing of Beauty")

### Modifications

It is super-simple to softmod your PSP and thus it is a great first step into the world of console hacking and modding. My PSP Go is running on the [6.61 PRO-C2](https://wololo.net/talk/viewtopic.php?t=41249) <abbr title="custom firmware">CFW</abbr> alongside [Infinity 2](http://infinity.lolhax.org/) to make the CFW permanent. The latter just received its version 2 update by hacker [Davee](https://twitter.com/DaveeFTW) and probably marks the end of the PSP softmod era. Read all about it [on Wololo](http://wololo.net/2019/11/10/release-infinity-2-0-enables-permanent-6-6x-custom-firmware-for-all-psps/) and watch [Tech James’ videos](https://www.youtube.com/user/Squirtle555) for installing guidance. (If you watch his [PSP Infinity 2.0 Install Guide](https://www.youtube.com/watch?v=YSYO6oWMfBk) make sure to also have a look at this [additional video](https://www.youtube.com/watch?v=lLGvVTm4j3g) that he put out later. There he explains how to make the CFW permanent.)

### Games

I dumped all my <b>Game Boy</b> games (including <abbr title="Game Boy Color">GBC</abbr> and <abbr title="Game Boy Advance">GBA</abbr>) with the [GB01 Cart Reader](/writing/the-gb01-cart-reader.html) and used to play them on emulators on my PSP Go. By now I managed to avoid emulation completely (but I am nonetheless very much looking forward to the arrival of the [Analogue Pocket](https://www.analogue.co/pocket/)) by playing GBA games on my 3DS and GB/GBC on my old and trusty <i>Game Boy Advance SP AGS-101</i>.

Playing <b>PSP</b> games without the disc is even simpler if you are on PRO CFW: Hit `SELECT` in the main PSP menu, change <i>USB Device</i> to <i>UMD Disc</i>, put in a disc (Since the PSP Go does not have a UMD disc drive, I always keep a <i>PSP 1000</i> handy to dump games), connect your PSP to your computer via USB, and copy the ISO file. Back on your PSP switch your <i>USB Device</i> back to <i>Memory Stick</i>, create a directory called `ISO` inside the memory stick’s root folder and copy the ISO file there.

Last but not least, the PSP also makes for an excellent portable <b>PS1</b>. I haven’t dabbled in ripping my PS1 discs and converting them to PSP games yet. But downloading <i>PS One Classics</i> from the PlayStation Network onto your PS3 and then transferring them onto your PSP via USB cable is much simpler anyways.

## Wii U

The Wii U is an underrated gem and the console I am spending the most time with. I wouldn’t go as far as calling it my favorite console—the PS3 will always have that special place in my heart—but the Wii U is a champion: It can play Wii U/Wii/GameCube games, has a fantastic <i>Virtual Console</i>, great input devices (and I am talking about the Pro Controller <em>and</em> the Gamepad), and it is the console that can play [almost every Zelda game](https://www.youtube.com/watch?v=KThuqZosM_g)! (All except the 3DS and GB/C games.)

![A Wii U console with all its controllers and peripherals](/images/gaming-setup/wiiu.jpg "Wii U—King of peripherals!")

### Modifications

My Wii U is on the latest firmware 5.5.4E and I softmodded it by using the standard <i>Haxchi</i> exploit with <i>Dr. Kawashima’s Brain Training</i> as the sacrificial DS Virtual Console game. I decided not to go with <i>Coldboot Haxchi</i> (CBHC), an exploit that is slightly more dangerous but rewards you with your Wii U automatically booting into CFW.

To play GameCube games, I additionally hacked Wii U’s <i>Virtual Wii</i> (vWii) by temporarily replacing the vWii’s MiiMaker Channel (try saying that three times fast) with [wuphax](https://github.com/FIX94/wuphax/releases/tag/v1.1u3).

### Games

Needless to say, the Wii U plays, well… <b>Wii U</b> games. I dumped all my physical copies using [disc2app](https://github.com/koolkdev/disc2app/releases/tag/v1.0) and installed them onto an 1TB external hard drive (Please note that the Wii U is using a <i>proprietary file system format</i>. That means you cannot use your Wii U external hard drive with your computer. Also, if your hard drive does not have its own power supply, you **will need a Y-cable** like mine in the photo above) with [WUP Installer GX2](https://sourceforge.net/projects/wup-installer-gx2/).

Thanks to Nintendo’s backwards compatibility policy, the Wii U supports <b>Wii</b> games out of the box. I dumped all my physical Wii (and GameCube) games with [USBLoaderGX](https://sourceforge.net/projects/usbloadergx/) on my good old Wii. In order to have them show up as single game tiles on the Wii U main screen, I used [TeconMoon’s WiiVC Injector](https://gbatemp.net/threads/release-wiivc-injector-script-gc-wii-homebrew-support.483577/).

I could have done the same for my physical <b>GameCube</b> games. But I decided to not turn them into Virtual Console injects because that would only allow me to play them with Wii controllers or the Wii U Gamepad. Instead, I keep them on the SD card (remember that you cannot put them on the external hard drive because of Wii U’s proprietray file architecture) and play them via the hacked vWii’s <i>Nintendont</i> app with a [Wii U forwarder](https://www.youtube.com/watch?v=nx5Ly5j2n8U). That way I can use the GameCube controller adapter for Wii U and my original GameCube controllers (including the <i>Wavebird</i>) for a proper retro feeling.

And then there are some <b>Virtual Console</b> games that I enjoy on the Wii U, like <i>Super Metroid</i>, <i>Paper Mario</i>, and <i>Majora’s Mask</i>—basically all the games that I don’t own physical copies of.

### What about that Good Ol’ Wii?

I actually softmodded my Wii long before my Wii U, but the latter has so much more to offer. I rarely even get the Wii out of its box and if I do, I usually play some WiiWare exclusives or dump Wii/GameCube games.

### A Note on the eShop

The Nintendo eShop for Wii U is still alive and kicking. And a wonderful place, I might add. However, I decided to play it safe and use custom DNS settings to prevent the system from fetching any official firmware updates. Unfortunately, those DNS settings also prevent the eShop from working. You will need the homebrew app [nnupatcher](https://github.com/dibas/nnupatcher-hbl) to remedy that, but I still had issues downloading my purchases.

If you are running into the same kind of trouble, check out this [Reddit post](https://www.reddit.com/r/WiiUHacks/comments/6nzvn3/tutorial_having_trouble_downloading_from_eshop/) which worked for me!

## New 3DS

Although I also own a Switch, I heavily use my 3DS. There are some real gems in the DS/3DS games library and I dig the clamshell/dual screen design. I still have quite the DS/3DS pile of shame, so for me this console is nowhere near dead! (Especially since [3DSident](https://github.com/joel16/3DSident) confirmed that I have a double IPS device 🤩)

![A 3DS showing the main menu](/images/gaming-setup/3ds.jpg "What’s not to love?")

### Modifications

My 3DS was on firmware 11.11.0-43E and I modded it by using the [Bannerbomb3](https://www.youtube.com/watch?v=kmctVrOOsSA) technique which exploits the DSiWare Data Management. It is now using the latest [Luma3DS CFW](https://github.com/AuroraWright/Luma3DS/releases). (Check out [MVG’s video](https://www.youtube.com/watch?v=2iCkfikOZd4) if you are interested in the timeline of 2DS/3DS hacking.)

I also inserted a 128GB microSD card that should be capable of holding all the DS and 3DS games I am interested in.

### Games

As soon as you install [GodMode9](https://github.com/d0k3/GodMode9) on your 3DS you have full access to the file system. Press `START` while powering on the console, and you will end up in the GodMode9 menu. There you can go to the game cart drive and dump your <b>DS</b> and <b>3DS</b> games onto your console’s microSD card.

I also used GodMode9 to convert all my <b>3DS</b> dumps into so-called `CIA` files that I then installed via the homebrew app <i>FBI</i>. (The homebrew scene is full of funny people!) They then show up as game tiles on the 3DS main menu.

For <b>DS</b> games, the story goes a little different: Until I figure out how to properly use the [Forwarder3DS](https://gbatemp.net/threads/nds-forwarder-cias-for-your-home-menu.426174/) tool (Update: It works superbly on a Windows machine 👍), I am playing them with [TWiLight Menu++](https://gbatemp.net/threads/ds-i-3ds-twilight-menu-gui-for-ds-i-games-and-ds-i-menu-replacement.472200/).

Last but not least, I recently learned that the 3DS can even hardware-emulate <b>GBA</b> games. The ten GBA games that got included in Nintendo’s <i>Ambassador Program</i> should have been a pretty big clue to me, but I leave it to [this Youtube video](https://www.youtube.com/watch?v=mQQN4P9sY48) to fill in the details. This is great news because that means that GBA roms turned into CIA files (made with the [New Super Ultimate Injector 3DS](https://digiex.net/threads/new-super-ultimate-injector-3ds-inject-nes-snes-gb-gbc-gba-smd-gamegear-turbigrafx-16-roms.15394/)) run quasi-natively on the 3DS.

## PS3

The PlayStation 3 is hands down my favorite console. This might very well be due to obscuring nostalgia because the PlayStation 3 Slim has been the first system I bought since the Game Boy. But it has an amazing game library with great exclusives, is PS1 backwards compatible, and a real multimedia allrounder. (And to date my only and trusted DVD/Blu Ray player!)

I haven’t modded my system—at this point I am not even sure [if that would be possible](https://www.youtube.com/watch?v=VBlYPmnJPLs&feature=youtu.be&t=106). I have upgraded the internal hard drive to 1TB, though. Also, I followed a [video tutorial on cleaning the PS3](https://www.youtube.com/watch?v=LiEZgzktsLo&t=1s) (especially its fan) and since then it is as good as new. All it took was two screwdrivers, compressed air, Q-tips, and some rubbing alcohol.

Eight years and counting, buddy.

## PS Vita

While the PS Vita is generally considered a failure in Sony’s console history, I’ve always been a big fan of the system. I used some freetime over Christmas 2019 to softmod my <i>PS Vita 1000</i> and am amazed what this handheld is capable of.

![The main character from the Game Ys 8 is gazing into the distance](/images/gaming-setup/ys8.png "Finally… Playing Ys VIII without a cartridge…")

### Modifications

I started with my Vita on firmware 3.68 and mostly followed the [PS Vita Hacks Guide](https://vita.hacks.guide), i.e. using the <i>h-encore</i> exploit, downgrading to 3.60, and installing <i>HENkaku</i> with <i>Ensō</i>. This CFW solution is very convenient because Ensō runs a boot-time exploit to setup HENkaku and the full homebrew environment. It is not necessary to install HENkaku after every restart of my system. Awesome!

Under the hood, my PS Vita is SD2Vita-enabled with a 128GB microSD card. Finally, I can say “Goodbye!” to the proprietary and overpriced memory cards from SONY.

### Games

For me, the most important reason to jailbreak a console is backing up my games. With the app [VitaShell](https://github.com/TheOfficialFloW/VitaShell) (file browser) and the plugin [NoNpDrm](https://github.com/TheOfficialFloW/NoNpDrm) (bypass DRM licenses, do yourself a favor and install via [Autoplugin](https://github.com/theheroGAC/Autoplugin)) you can do exactly that. Just follow the [README](https://github.com/TheOfficialFloW/NoNpDrm/blob/master/readme.md) of NoNpDrm and you are good to enjoy your <b>PS Vita</b> games without a cartridge.

Another real gem among the Vita’s homebrew apps is [Adrenaline](https://github.com/TheOfficialFloW/Adrenaline). It boots you into a 6.61 PSP emulation environment where you can run all your <b>PSP</b> ISOs, <b>PS1</b> games, and even PSP homebrew games. Combined with the still alive-and-kicking PSN store (that you can still use thanks to firmware <i>version spoofing</i>) where you can find PS One Classics and PSP games, this makes for an impressive library. You can even install RetroArch and other emulators on the Vita if that is your thing.

## Other Systems

I also own a Switch, an original Xbox, and an Xbox One X. I might cover those systems in future posts.

Update (November 2020): I bought an ASUS ROG Zephyrus G14 gaming laptop and… well, that is a whole ‘nother story…

## Sources

### Softmod Guides

* [Wii Guide](https://wii.guide/)
* [Wii U Hacks Guide](https://wiiu.hacks.guide/)
* [vWii Hacking Guide](https://gbatemp.net/threads/the-definitive-vwii-hacking-guide.425852/)
* [3DS Hacks Guide](https://3ds.hacks.guide/)
* [PS Vita Hacks Guide](https://vita.hacks.guide/)

### Youtube Channels

* [Modern Vintage Gamer](https://www.youtube.com/user/jimako123)
* [MrMario](https://www.youtube.com/user/MrMario2011)
* [Jack Sorrell](https://www.youtube.com/channel/UCDUBppdZBxVlLIL6-8zbOOA) ([website](https://jacksorrell.tv/))
* [Tech James](https://www.youtube.com/user/Squirtle555)
* [GameInCanada](https://www.youtube.com/channel/UCgMxckjnxa5NhMHM4wIO51Q)
* [sthetix](https://www.youtube.com/channel/UCpR1Wfz7_tuAPr81G-5Eceg)

### Forums

* [GBATemp](https://gbatemp.net/forums/)
