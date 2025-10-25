const davidFullTimeline = [
    // Early Life & Rise
    {
        incident: "David’s Family & Lineage",
        samuel: "1 Sam 16:1",
        kings: "—",
        chronicles: "1 Chr 2:13–15",
        notes: "Chronicles gives full genealogy; Samuel introduces Jesse and David."
    },
    {
        incident: "David’s Anointing by Samuel",
        samuel: "1 Sam 16:1–13",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles omits; Samuel details the secret anointing."
    },
    {
        incident: "David Plays Harp for Saul",
        samuel: "1 Sam 16:14–23",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel records David serving Saul to calm his spirit."
    },
    {
        incident: "David and Goliath",
        samuel: "1 Sam 17",
        kings: "—",
        chronicles: "1 Chr 20:5 (Goliath’s brother)",
        notes: "Chronicles omits the story, lists battle results later."
    },
    {
        incident: "David’s Friendship with Jonathan",
        samuel: "1 Sam 18–20",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel includes their covenant and emotional friendship."
    },
    {
        incident: "David Marries Michal (Saul’s daughter)",
        samuel: "1 Sam 18:17–27",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel records this early marriage and Saul’s jealousy."
    },
    {
        incident: "David’s Growing Fame and Saul’s Jealousy",
        samuel: "1 Sam 18–19",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles skips; Samuel gives emotional detail."
    },
    {
        incident: "David’s Escape & Exile",
        samuel: "1 Sam 21–27",
        kings: "—",
        chronicles: "1 Chr 12",
        notes: "Chronicles adds the names of warriors who joined David in exile."
    },
    {
        incident: "David Spares Saul (twice)",
        samuel: "1 Sam 24; 26",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel includes these forgiveness moments."
    },
    {
        incident: "David Among Philistines (Ziklag)",
        samuel: "1 Sam 27–30",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel narrates his time in exile among enemies."
    },
    {
        incident: "Death of Saul",
        samuel: "1 Sam 31",
        kings: "—",
        chronicles: "1 Chr 10",
        notes: "Both record Saul’s death; Chronicles adds moral cause — Saul’s disobedience."
    },
    {
        incident: "David Mourns Saul and Jonathan",
        samuel: "2 Sam 1",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel includes “Song of the Bow.”"
    },
    // Kingdom Establishment
    {
        incident: "David Crowned King of Judah (Hebron)",
        samuel: "2 Sam 2:1–4",
        kings: "—",
        chronicles: "1 Chr 11:1–3",
        notes: "Chronicles summarizes both Hebron and Israel kingship together."
    },
    {
        incident: "Civil War between Saul’s House & David’s",
        samuel: "2 Sam 2–4",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles omits conflict, focuses on unity."
    },
    {
        incident: "David Crowned King over Judah",
        samuel: "2 Sam 2:1–4",
        kings: "—",
        chronicles: "1 Chr 11:1–3",
        notes: "Samuel shows step-by-step rise (Judah first); Chronicles merges Judah & Israel coronation."
    },
    {
        incident: "Civil War with Saul’s House (Ish-bosheth)",
        samuel: "2 Sam 2–4",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles skips this entire conflict — focus remains on unity."
    },
    {
        incident: "David Crowned King over All Israel",
        samuel: "2 Sam 5:1–5",
        kings: "—",
        chronicles: "1 Chr 11:1–3",
        notes: "Both record it; Chronicles adds leaders pledging loyalty."
    },
    {
        incident: "Capture of Jerusalem (Zion)",
        samuel: "2 Sam 5:6–10",
        kings: "—",
        chronicles: "1 Chr 11:4–9",
        notes: "Same event; Chronicles adds David’s helpers and “Lord of hosts was with him.”"
    },
    {
        incident: "David’s Palace Built (Hiram of Tyre)",
        samuel: "2 Sam 5:11–12",
        kings: "—",
        chronicles: "1 Chr 14:1–2",
        notes: "Both mention Hiram’s help — early foreign alliance."
    },
    {
        incident: "David’s Family / Children Born in Jerusalem",
        samuel: "2 Sam 5:13–16",
        kings: "—",
        chronicles: "1 Chr 14:3–7",
        notes: "Identical lists of sons."
    },
    {
        incident: "Defeat of Philistines (Twice at Rephaim Valley)",
        samuel: "2 Sam 5:17–25",
        kings: "—",
        chronicles: "1 Chr 14:8–17",
        notes: "Chronicles adds more emphasis on seeking God before battle."
    },
    {
        incident: "Bringing the Ark of God to Jerusalem (First attempt fails – Uzzah dies)",
        samuel: "2 Sam 6:1–11",
        kings: "—",
        chronicles: "1 Chr 13:1–14",
        notes: "Chronicles adds consultation with leaders and community involvement."
    },
    {
        incident: "Second Attempt – Ark Brought with Joy & Worship",
        samuel: "2 Sam 6:12–23",
        kings: "—",
        chronicles: "1 Chr 15–16",
        notes: "Chronicles expands massively: priestly orders, music, psalm of thanksgiving (1 Chr 16:8–36)."
    },
    {
        incident: "David’s Desire to Build a Temple & God’s Covenant Promise",
        samuel: "2 Sam 7",
        kings: "—",
        chronicles: "1 Chr 17",
        notes: "Nearly identical — Chronicles uses slightly more reverent language and includes worship tone."
    },
    {
        incident: "David’s Prayer of Thanksgiving for God’s Covenant",
        samuel: "2 Sam 7:18–29",
        kings: "—",
        chronicles: "1 Chr 17:16–27",
        notes: "Paralleled prayer — wording differs slightly in style, same meaning."
    },
    {
        incident: "David’s Victories over Surrounding Nations (Philistines, Moab, Edom, etc.)",
        samuel: "2 Sam 8",
        kings: "—",
        chronicles: "1 Chr 18",
        notes: "Chronicles summarizes, adds more about dedicating spoils to God."
    },
    {
        incident: "David Shows Kindness to Mephibosheth (Jonathan’s Son)",
        samuel: "2 Sam 9",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel — highlights David’s mercy and covenant faithfulness."
    },
    {
        incident: "War with Ammonites & Arameans (Syria)",
        samuel: "2 Sam 10",
        kings: "—",
        chronicles: "1 Chr 19",
        notes: "Chronicles keeps military view, omits emotional narrative."
    },
    {
        incident: "Bathsheba & Uriah Incident (David’s Sin)",
        samuel: "2 Sam 11–12",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles omits completely — maintains focus on worship, not personal sin."
    },
    {
        incident: "David’s Sin with Bathsheba",
        samuel: "2 Sam 11",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel records this entire tragic episode — adultery, deception, and Uriah’s death."
    },
    {
        incident: "Nathan’s Rebuke (“You are the man”)",
        samuel: "2 Sam 12:1–14",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel. Chronicles omits the moral fall, keeping focus on covenant purity."
    },
    {
        incident: "David’s Repentance (Psalm 51 context)",
        samuel: "2 Sam 12:13",
        kings: "—",
        chronicles: "—",
        notes: "Samuel briefly notes repentance; Psalm 51 gives full emotional picture separately."
    },
    {
        incident: "Death of the First Child (as punishment)",
        samuel: "2 Sam 12:15–23",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel includes it; shows consequences of sin."
    },
    {
        incident: "Birth of Solomon (After Repentance / forgiveness)",
        samuel: "2 Sam 12:24–25",
        kings: "—",
        chronicles: "1 Chr 3:5; 14:4",
        notes: "Chronicles records Solomon’s birth later in family list, not story."
    },
    {
        incident: "David’s Victory over Ammon & Rabbah",
        samuel: "2 Sam 12:26–31",
        kings: "—",
        chronicles: "1 Chr 20:1–3",
        notes: "Chronicles includes only the military side — removes moral sin context."
    },
    {
        incident: "Amnon’s Sin against Tamar",
        samuel: "2 Sam 13:1–22",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel includes it — one of the darkest family events."
    },
    {
        incident: "Absalom Murders Amnon",
        samuel: "2 Sam 13:23–29",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles omits it — doesn’t include internal family bloodshed."
    },
    {
        incident: "Absalom’s Exile and Return",
        samuel: "2 Sam 13:34–39; 14:1–33",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel records Joab’s involvement and the wise woman of Tekoa."
    },
    {
        incident: "Absalom’s Rebellion and David’s Flight",
        samuel: "2 Sam 15–18",
        kings: "—",
        chronicles: "—",
        notes: "Only Samuel — Chronicles omits to preserve image of worshipful king."
    },
    {
        incident: "David’s Grief for Absalom (“O my son Absalom”)",
        samuel: "2 Sam 18:33",
        kings: "—",
        chronicles: "—",
        notes: "Among the most emotional moments; omitted in Chronicles."
    },
    {
        incident: "David’s Restoration to the Throne",
        samuel: "2 Sam 19",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles omits the political details and national divisions."
    },
    {
        incident: "Sheba’s Rebellion",
        samuel: "2 Sam 20:1–26",
        kings: "—",
        chronicles: "—",
        notes: "Only in Samuel; Joab kills Amasa; another sign of unrest."
    },
    {
        incident: "Famine due to Saul’s Sin against Gibeonites",
        samuel: "2 Sam 21:1–14",
        kings: "—",
        chronicles: "—",
        notes: "Chronicles skips this. Samuel shows David’s justice & mercy."
    },
    {
        incident: "Wars with Philistine Giants (Goliath’s kin)",
        samuel: "2 Sam 21:15–22",
        kings: "—",
        chronicles: "1 Chr 20:4–8",
        notes: "Both record battles; Chronicles condenses into a short summary."
    },
    {
        incident: "David’s Song of Deliverance (like Psalm 18)",
        samuel: "2 Sam 22",
        kings: "—",
        chronicles: "—",
        notes: "Only in Samuel; David’s praise after trials."
    },
    {
        incident: "David’s Last Words / Mighty Men",
        samuel: "2 Sam 23",
        kings: "—",
        chronicles: "1 Chr 11",
        notes: "Chronicles moves the mighty men list earlier, omits personal “last words.”"
    },
    {
        incident: "David’s Census & Plague",
        samuel: "2 Sam 24:1–25",
        kings: "—",
        chronicles: "1 Chr 21:1–30",
        notes: "Both record census; Chronicles clarifies Satan tempted David, giving a deeper spiritual view."
    },
    {
        incident: "Purchase of Araunah/Ornan’s Threshing Floor (Future Temple Site)",
        samuel: "2 Sam 24:18–25",
        kings: "—",
        chronicles: "1 Chr 21:18–30",
        notes: "Same event — Chronicles connects the site to Mount Moriah, future Temple Mount."
    },
    {
        incident: "David Recognizes the Temple Site",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 22:1",
        notes: "Unique to Chronicles — David declares: 'This is the house of the Lord God.'"
    },
    {
        incident: "David’s Preparations for the Temple",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 22:2–19",
        notes: "Chronicles alone: David gathers materials, stones, gold, and commands Solomon to build."
    },
    {
        incident: "David Organizes Levites, Priests, Musicians, Gatekeepers",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 23–26",
        notes: "Unique to Chronicles — details about 24 priestly divisions, worship teams (Asaph, Heman, Jeduthun)."
    },
    {
        incident: "David’s Military & Civil Administration",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 27",
        notes: "Chronicles adds army divisions, tribal leaders, and counselors."
    },
    {
        incident: "David’s Old Age (Preparation for Solomon)",
        samuel: "—",
        kings: "1 Kgs 1",
        chronicles: "1 Chr 22–29",
        notes: "Both record aging David; Kings shows succession conflict with Adonijah, Chronicles shows temple preparations."
    },
    {
        incident: "Adonijah’s Attempt to Take the Throne",
        samuel: "—",
        kings: "1 Kgs 1:5–53",
        chronicles: "—",
        notes: "Only Kings — records the succession crisis. Chronicles skips all political drama."
    },
    {
        incident: "Solomon Anointed as King (While David Still Alive)",
        samuel: "—",
        kings: "1 Kgs 1:32–40",
        chronicles: "1 Chr 23:1; 28–29",
        notes: "Both record Solomon’s coronation; Chronicles adds worship, joy, and national unity."
    },
    {
        incident: "David’s Final Address to Israel",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 28:1–10",
        notes: "Chronicles uniquely preserves this speech: David charges Solomon to serve God with a perfect heart."
    },
    {
        incident: "David Gives Temple Blueprints (Given by the Spirit)",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 28:11–19",
        notes: "Unique — God gave David detailed plans for the temple, like Moses received for the tabernacle."
    },
    {
        incident: "David’s Offering for the Temple",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 29:1–9",
        notes: "Only Chronicles — David gives from his personal wealth and inspires the people to give joyfully."
    },
    {
        incident: "David’s Final Prayer of Praise and Thanksgiving",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 29:10–19",
        notes: "One of David’s most beautiful prayers — emphasizes that everything comes from God."
    },
    {
        incident: "Joyful Public Worship and Sacrifices",
        samuel: "—",
        kings: "—",
        chronicles: "1 Chr 29:20–25",
        notes: "Chronicles records national worship before Solomon’s reign begins."
    },
    {
        incident: "David’s Final Words & Counsel to Solomon",
        samuel: "—",
        kings: "1 Kgs 2:1–9",
        chronicles: "1 Chr 28–29",
        notes: "Kings: focuses on justice and unfinished matters; Chronicles: focuses on faith and worship."
    },
    {
        incident: "David’s Death and Burial",
        samuel: "—",
        kings: "1 Kgs 2:10–12",
        chronicles: "1 Chr 29:26–30",
        notes: "Both record peaceful death; Chronicles adds that he 'died in a good old age, full of riches, honor, and days.'"
    },
    {
        incident: "David’s Legacy Mentioned After Death",
        samuel: "—",
        kings: "1 Kgs 3:14; 9:4; 11:4",
        chronicles: "2 Chr 6:42",
        notes: "Later kings are always compared to David — 'as your father David walked.' Chronicles recalls his heart and worship."
    },
    {
        incident: "David’s Psalms (during late life)",
        samuel: "(Linked, not in narrative)",
        kings: "—",
        chronicles: "(Linked thematically)",
        notes: "Psalms 18, 30, 32, 51, 103, 145 — reflect his repentance, gratitude, and devotion."
    }
];
