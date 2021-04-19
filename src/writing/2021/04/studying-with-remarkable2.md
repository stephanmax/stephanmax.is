---
title: "Studying with the Remarkable 2"
published: 2021-04-18
---

Last month I went through somewhat of an exam marathon. By my side: My trusty [Remarkable 2](https://remarkable.com/) tablet. A song of praise.

![The Remarkable 2 tablet, the Marker Plus, and a cup of coffee on a wooden table](/images/studying-with-remarkable2/remarkable2.jpg#splash "Studying without distractions")

I do not want to get too much into the controversy around this device (huge hype, bad customer support) and would like to point you to [Reddit](https://www.reddit.com/r/RemarkableTablet/) to read up on that if you are interested. This is rather a description of how I set up my device and turned it into my daily companion for all things written.

## Connectivity

The Remarkable 2 is an oddball device in a sense. On the one hand, the company behind is doing a pretty good job at coming across as an uncommunicative, customer-unfriendly bunch. On the other hand, they decided not to go with some kind of Android closed-down operating system, but put the Remarkable software on top of a GNU/Linux-based OS. And they even give you *root access*.

So the first thing I did was going into the device’s settings, hit *Help*, and write down the root password for the device displayed at the bottom of the page. After an initial ssh connection, copying my public key onto the Remarkable, and creating a host entry in my computer’s ssh config, my Remarkable is now only an `ssh remarkable` away. This opens the doors to clever [developers and hackers](https://github.com/reHackable/awesome-reMarkable) and allows everyone to install custom [software](#software) on their device.

For the occasional one-off upload of lecture notes and other PDFs I connect my Remarkable to my computer via USB and go to the web interface at `10.11.99.1`. (Make sure to enable this feature in the Wi-Fi settings of the Remarkable.) The web interface is a very primitive tool and does not allow much more than drag and drop upload and single-file download. But I don’t have to use it too often and it allows me to not give a damn about Remarkable’s cloud sync feature. Privacy all the way!

## Software

I am currently running on Remarkable’s software Version 2.5.0.27-patch_17.2.07-0-g0782dc9. I know about the new 2.6 update and what wonders it brings (most notably pinch-to-zoom and PDF links), but I also heard about some bugs around it and do not need any of those new features—because of custom software.

I additionally installed:

* [KOReader](https://github.com/ddvk/remarkable-autoinstall/tree/master/rm2), a fantastic e-reader app that definitely trumps Remarkable’s built-in reader software in every aspect
* [ddvk’s remarkable-hacks](https://github.com/ddvk/remarkable-hacks), a binary patch that adds some much-needed additional functionality to the Remarkable

If the instructions on GitHub intimidate you, I can recommend the *How to Install* videos on *EVERYTHING cpo’s* YouTube channel ([KOReader](https://www.youtube.com/watch?v=FzzlMbOluyk), [ddvk hacks](https://www.youtube.com/watch?v=VSCKqiiIWSQ)).

## Studying

The Remarkable tablet with its vanilla software is a stellar note-taking device but falls short of being a good study companion. ddvk’s hacks changed that and I would like to highlight some of the features I have used the most:

* Pinch-to-zoom
* Swipe down in the middle of the page to toggle the side menu
* Two-finger swipe down to switch to previous document
  * What a game changer! Makes switching between exercise and lecture PDF a breeze!
* Two-finger swipe up to get a list of recent files (shown per default when entering Remarkable’s main menu)
* Swipe down in the top menu corner to switch between last two pens
  * It doesn’t sound like much, but when you have to switch between ballpoint pen and highlighter constantly you really appreciate this feature.
* Swipe left/right top-center to undo/redo
* And last but definitely not least: BOOKMARKS! 😍

Those features—combined with the out-of-the-box advantages of the Remarkable tablet: form factor, distraction-free interface, gorgeous e-ink screen—completed the device for me.

## Reading

While I use Remarkable’s (ddvk-enhanced) vanilla software to read PDFs, the e-reading experience with epubs and the like is… subpar. Luckily, KOReader is an amazing alternative that not only offers swift layout and font changes, but also an absolute killer feature: <abbr title="Open Publication Distribution System">OPDS</abbr> catalogs.

I manage all my ebooks with [Calibre](https://calibre-ebook.com/) and have my Calibre library stored on my in-house <abbr title="Network-attached storage">NAS</abbr>. A while ago I installed the [COPS server](https://github.com/seblucas/cops) on top which gives me a nice OPDS-compliant feed of all my ebooks. KOReader now allows me to add this feed as an external OPDS source. That means I can download my ebooks straight out of the KOReader app onto the Remarkable—just like my own little Kindle eShop—without USB connection or Remarkable cloud.

It. Is. Fantastic!

## Final Verdict

The Remarkable 2 has a hefty price tag (400€ + marker) and the company behind has yet to prove whether they want to create something useful for their fans and customers or only please their investors.

But damn I’ll say it: I love this little tablet!

I use it daily: For bulletjournaling, scribbling down random ideas, the occasional doodle or urban sketch, as my e-reader, and of course as my study buddy for university. A huge Thank You to all the hackers and tinkerers out there who have proven that top notch hardware with sloppy software can indeed be fixed.
