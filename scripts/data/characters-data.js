const charactersData = [
    {
        name: "Aaron",
        description: "The first high priest of Israel and brother of Moses who spoke on his behalf before Pharaoh.",
        lesson: "Spiritual leadership requires humility and obedience to God's instructions."
    },
    {
        name: "Abednego",
        description: "One of Daniel’s three companions saved miraculously from Nebuchadnezzar’s fiery furnace.",
        lesson: "God delivers those who refuse to bow to false gods."
    },
    {
        name: "Abel",
        description: "Second son of Adam and Eve; a shepherd whose righteous offering angered his brother Cain.",
        lesson: "God values sincere worship and a pure heart."
    },
    {
        name: "Abigail",
        description: "A wise and godly woman who prevented David from taking revenge and later became his wife.",
        lesson: "Wisdom and humility can turn away wrath and bring peace."
    },
    {
        name: "Abraham",
        description: "The first patriarch and father of the Hebrew nation; trusted God’s promises and obeyed by faith.",
        lesson: "True faith is shown through obedience, even when the outcome is unseen."
    },
    {
        name: "Absalom",
        description: "Third son of David who rebelled against his father and was killed during his revolt.",
        lesson: "Pride and rebellion against authority lead to destruction."
    },
    {
        name: "Ahithophel",
        description: "A trusted counselor of King David who joined Absalom’s rebellion and took his own life when rejected.",
        lesson: "Betrayal and bitterness bring ruin to the soul."
    },
    {
        name: "Adam",
        description: "The first man created by God; father of the human race and the first to fall into sin.",
        lesson: "Disobedience to God brings separation, but His grace offers restoration."
    },
    {
        name: "Ahab",
        description: "King of Israel who married Jezebel and led the nation into idolatry; rebuked by Elijah.",
        lesson: "Compromise with evil and ungodly influences brings divine judgment."
    },
    {
        name: "Ahasuerus",
        description: "King of Persia and husband of Esther, often identified with Xerxes I.",
        lesson: "God can use even pagan kings to accomplish His divine purposes."
    },
    {
        name: "Ammon",
        description: "Son of Lot and ancestor of the Ammonites, a people often in conflict with Israel.",
        lesson: "Sinful beginnings can lead to long-term conflict if not surrendered to God."
    },
    {
        name: "Amos",
        description: "A shepherd-prophet of the 8th century BC who boldly called Israel to repentance and justice.",
        lesson: "True faith demands righteousness and compassion, not empty rituals."
    },
    {
        name: "Ananias",
        description: "A man in Jerusalem who, with his wife Sapphira, lied to the Holy Spirit and died instantly.",
        lesson: "God values honesty; deceit in His presence brings judgment."
    },
    {
        name: "Andrew",
        description: "One of the twelve apostles and brother of Peter; known for bringing others to Jesus.",
        lesson: "Evangelism begins by introducing even one person to Christ."
    },
    {
        name: "Asher",
        description: "Son of Jacob and ancestor of one of the twelve tribes of Israel, known for abundance and prosperity.",
        lesson: "God’s blessings can overflow through obedience and faithfulness."
    },
    {
        name: "Balaam",
        description: "A diviner who was hired to curse Israel but instead blessed them as God commanded.",
        lesson: "No one can curse whom God has blessed; greed blinds spiritual vision."
    },
    {
        name: "Barabbas",
        description: "A criminal released instead of Jesus at Passover.",
        lesson: "Christ took the place of the guilty so the undeserving could go free."
    },
    {
        name: "Bartholomew",
        description: "One of the twelve apostles, also known as Nathanael, known for his sincerity.",
        lesson: "Jesus honors those who are honest and without deceit."
    },
    {
        name: "Baruch",
        description: "Faithful scribe and companion of the prophet Jeremiah.",
        lesson: "Serving faithfully behind the scenes is precious in God’s sight."
    },
    {
        name: "Bathsheba",
        description: "Wife of Uriah who committed adultery with David and later became mother of Solomon.",
        lesson: "Repentance and God’s grace can bring redemption from failure."
    },
    {
        name: "Beelzebub",
        description: "A Philistine deity later identified as a name for Satan.",
        lesson: "False gods represent rebellion against the one true God."
    },
    {
        name: "Belial",
        description: "A term used to describe wickedness or personified evil, often identified with Satan.",
        lesson: "Evil has no fellowship with righteousness; avoid all association with it."
    },
    {
        name: "Belshazzar",
        description: "Babylonian ruler who saw the writing on the wall foretelling his downfall.",
        lesson: "Arrogance before God leads to sudden judgment."
    },
    {
        name: "Benjamin",
        description: "Youngest son of Jacob and Rachel; deeply loved by his father.",
        lesson: "God’s plans include even the smallest and least significant."
    },
    {
        name: "Boanerges",
        description: "Nickname given by Jesus to James and John meaning 'sons of thunder'.",
        lesson: "Zeal for God must be guided by love and humility."
    },
    {
        name: "Boaz",
        description: "Kind and honorable kinsman of Naomi who married Ruth and became ancestor of David.",
        lesson: "Integrity and kindness bring lasting blessings."
    },
    {
        name: "Caiaphas",
        description: "High priest during the ministry of Jesus who played a role in His crucifixion.",
        lesson: "Religious authority without truth leads to hypocrisy and guilt."
    },
    {
        name: "Cain",
        description: "First son of Adam and Eve who murdered his brother Abel out of jealousy.",
        lesson: "Jealousy and sin unconfessed can destroy relationships and lives."
    },
    {
        name: "Cush",
        description: "Son of Ham and brother of Canaan; ancestor of the Cushites.",
        lesson: "Lineages remind us that all nations trace back to God’s creation plan."
    },
    {
        name: "Dan",
        description: "The fourth son of Jacob, born to Bilhah, Rachel’s maidservant.",
        lesson: "Every tribe has purpose in God’s plan, regardless of its origin."
    },
    {
        name: "Daniel",
        description: "A prophet taken to Babylon who interpreted dreams and was protected in the lions’ den.",
        lesson: "Faithfulness and integrity stand firm even under persecution."
    },
    {
        name: "David",
        description: "The second king of Israel, a man after God’s own heart, writer of many Psalms.",
        lesson: "Repentance restores fellowship with God, even after failure."
    },
    {
        name: "Deborah",
        description: "Rebecca’s nurse, later a prophetess and judge who led Israel to victory.",
        lesson: "God uses willing and courageous hearts to lead His people."
    },
    {
        name: "Delilah",
        description: "Philistine woman who deceived Samson and caused his downfall.",
        lesson: "Beware of relationships that compromise spiritual strength."
    },
    {
        name: "Dinah",
        description: "Daughter of Jacob and Leah, defiled in Shechem, leading to family revenge.",
        lesson: "Worldly associations can bring painful consequences."
    },
    {
        name: "Dives",
        description: "The rich man in Jesus’ parable who ignored poor Lazarus and suffered torment after death.",
        lesson: "Compassion and generosity matter more than earthly wealth."
    },
    {
        name: "Dorcas",
        description: "A charitable woman from Joppa known for her good works; raised to life by Peter.",
        lesson: "Acts of kindness leave a legacy that pleases God."
    },
    {
        name: "Elias",
        description: "Another name for Elijah, the fiery prophet who confronted Ahab and Jezebel.",
        lesson: "Zeal for God must be accompanied by faith and perseverance."
    },
    {
        name: "Elijah",
        description: "Prophet who called down fire from heaven and opposed idolatry under Ahab’s reign.",
        lesson: "One person fully devoted to God can stand against a nation’s sin."
    },
    {
        name: "Elisha",
        description: "Prophet and successor of Elijah who performed many miracles of mercy and power.",
        lesson: "God’s power continues through faithful servants who follow Him closely."
    },
    {
        name: "Enoch",
        description: "Son of Cain and founder of the first city named after him.",
        lesson: "Earthly achievements fade; only walking with God brings lasting legacy."
    },
    {
        name: "Enos",
        description: "Son of Seth who led people to begin calling on the name of the Lord.",
        lesson: "Revival begins when people turn their hearts back to God."
    },
    {
        name: "Ephraim",
        description: "Younger son of Joseph who received the greater blessing from Jacob.",
        lesson: "God’s favor is based on His choice, not human expectations."
    },
    {
        name: "Esau",
        description: "Son of Isaac and Rebekah who sold his birthright for a meal.",
        lesson: "Short-term desires can cost long-term blessings."
    },
    {
        name: "Esther",
        description: "Jewish queen of Persia who saved her people from destruction.",
        lesson: "God positions us for purpose — 'for such a time as this'."
    },
    {
        name: "Eve",
        description: "The first woman created by God, mother of all living.",
        lesson: "Temptation begins with doubt; obedience guards the soul."
    },
    {
        name: "Ezekiel",
        description: "Prophet who saw visions of God’s glory and foretold the restoration of Israel.",
        lesson: "God’s Spirit revives dry bones — there’s hope for renewal."
    },
    {
        name: "Ezra",
        description: "Priest and scribe who led the return from Babylon and restored worship in Jerusalem.",
        lesson: "Spiritual reform begins with returning to God’s Word."
    },
    {
        name: "Gabriel",
        description: "Archangel who delivered messages of hope to Daniel, Zechariah, and Mary.",
        lesson: "God communicates His plans clearly through faithful messengers."
    },
    {
        name: "Gad",
        description: "Sixth son of Jacob by Zilpah, Leah’s maidservant; founder of the tribe of Gad.",
        lesson: "Strength and loyalty characterize those who stand by God’s people."
    },
    {
        name: "Gideon",
        description: "Judge who led Israel to victory over the Midianites with only 300 men.",
        lesson: "God’s strength is made perfect in our weakness."
    },
    {
        name: "Gilead",
        description: "Grandson of Manasseh and ancestor of the Gileadites.",
        lesson: "Family heritage carries both responsibility and blessing."
    },
    {
        name: "Gog and Magog",
        description: "Symbolic names for enemies of God who will attack Israel in the last days.",
        lesson: "Evil may rise, but God’s victory is certain."
    },
    {
        name: "Goliath",
        description: "Philistine giant defeated by David with a sling and a stone.",
        lesson: "Faith in God conquers any giant, no matter the odds."
    },
    {
        name: "Good Samaritan",
        description: "Man in Jesus’ parable who showed mercy to a wounded stranger.",
        lesson: "True neighborly love transcends race, religion, and status."
    },
    {
        name: "Habakkuk",
        description: "Prophet who questioned God’s justice but learned to trust His plan.",
        lesson: "Faith means rejoicing even when circumstances look bleak."
    },
    {
        name: "Hagar",
        description: "Egyptian maidservant of Sarah who bore Abraham’s son Ishmael.",
        lesson: "God sees and cares for the rejected and forgotten."
    },
    {
        name: "Haggai",
        description: "Prophet who encouraged rebuilding of the temple after exile.",
        lesson: "Putting God first brings blessing to every area of life."
    },
    {
        name: "Ham",
        description: "Second son of Noah; his descendants populated parts of Africa.",
        lesson: "Irreverence toward parents and authority leads to lasting shame."
    },
    {
        name: "Hannah",
        description: "Mother of Samuel who prayed fervently for a child and dedicated him to God.",
        lesson: "Persistent prayer and faith produce miraculous answers."
    },
    {
        name: "Herod the Great",
        description: "King of Judea known for cruelty and for ordering the massacre of infants in Bethlehem.",
        lesson: "Pride and fear of losing power lead to monstrous sin."
    },
    {
        name: "Hezekiah",
        description: "King of Judah known for his faith and reforms; prayed and received 15 extra years of life.",
        lesson: "Prayer can move God’s heart and change outcomes."
    },
    {
        name: "Hiram",
        description: "King of Tyre who supplied materials and craftsmen for Solomon’s Temple.",
        lesson: "Partnerships with integrity advance God’s work."
    },
    {
        name: "Holofernes",
        description: "Assyrian general slain by Judith after besieging Bethulia.",
        lesson: "Pride and cruelty are overthrown by God’s justice through unexpected means."
    },
    {
        name: "Hosea",
        description: "Prophet whose marriage symbolized God’s faithful love for unfaithful Israel.",
        lesson: "God’s love remains steadfast despite human unfaithfulness."
    },
    {
        name: "Isaac",
        description: "Son of Abraham and Sarah, father of Jacob and Esau, and heir of the covenant promise.",
        lesson: "God’s promises continue through faith and obedience."
    },
    {
        name: "Isaiah",
        description: "Major prophet who proclaimed God’s holiness and the coming of the Messiah.",
        lesson: "Seeing God’s glory brings repentance and a call to serve."
    },
    {
        name: "Ishmael",
        description: "Son of Abraham and Hagar; ancestor of many nations.",
        lesson: "God’s mercy extends even to those born outside the promise."
    },
    {
        name: "Issachar",
        description: "Fifth son of Jacob and Leah; ancestor of the tribe known for wisdom and discernment.",
        lesson: "Understanding the times and acting wisely honors God."
    },
    {
        name: "Jacob",
        description: "Son of Isaac, father of the twelve tribes of Israel; renamed Israel after wrestling with God.",
        lesson: "God transforms deceitful hearts into faithful servants."
    },
    {
        name: "Jael",
        description: "Woman who killed Sisera to deliver Israel from oppression.",
        lesson: "God can use unexpected people to accomplish great deliverance."
    },
    {
        name: "James the Less",
        description: "One of the twelve apostles, son of Alphaeus.",
        lesson: "Quiet service in the background is still valuable to God."
    },
    {
        name: "Japheth",
        description: "Second son of Noah; ancestor of many nations across Europe and Asia.",
        lesson: "God’s blessing spreads through generations who walk in His favor."
    },
    {
        name: "Jehoshaphat",
        description: "King of Judah known for seeking God and leading the people in worship before battle.",
        lesson: "Victory comes when we praise before we fight."
    },
    {
        name: "Jehu",
        description: "King of Israel who destroyed Ahab’s family and purged Baal worship.",
        lesson: "Zeal for God must be guided by obedience, not pride."
    },
    {
        name: "Jephthah",
        description: "Judge who made a rash vow and ended up sacrificing his daughter.",
        lesson: "Think before you speak; words carry deep consequences."
    },
    {
        name: "Jeremiah",
        description: "Prophet who warned Judah of destruction and wept over their sin.",
        lesson: "Faithfulness to God’s truth often brings suffering but eternal reward."
    },
    {
        name: "Jeroboam",
        description: "First king of the northern kingdom who led Israel into idolatry.",
        lesson: "False worship separates people from God’s presence."
    },
    {
        name: "Jesse",
        description: "Father of King David from the tribe of Judah.",
        lesson: "God often chooses the humble and overlooked to fulfill His plans."
    },
    {
        name: "Jesus Christ",
        description: "Son of God, Savior of the world, born in Bethlehem, crucified, risen, and ascended to heaven.",
        lesson: "Through Christ, God’s love and salvation are made complete for all mankind."
    },
    {
        name: "Jethro",
        description: "A Midianite priest, the father-in-law of Moses (Exodus 3:1; 4:18).",
        lesson: "Wise counsel and humility can guide even great leaders like Moses."
    },
    {
        name: "Jezebel",
        description: "The wife of Ahab, king of Israel, who fostered Baal worship and persecuted God’s prophets (1 Kings 18:4–13; 2 Kings 9:29–37).",
        lesson: "Arrogance and rebellion against God lead to destruction."
    },
    {
        name: "Joab",
        description: "Commander of King David’s army, known for his victories and acts of revenge (2 Samuel 2:18–23; 3:24–27; 18:14–15).",
        lesson: "Courage without obedience to God can turn into cruelty."
    },
    {
        name: "Job",
        description: "A righteous man who remained faithful through intense suffering.",
        lesson: "True faith endures even when tested by great loss."
    },
    {
        name: "Joel",
        description: "A Hebrew prophet who called for repentance and foretold the outpouring of the Spirit.",
        lesson: "Repentance brings restoration and the Spirit’s renewal."
    },
    {
        name: "John",
        description: "The Apostle John, son of Zebedee, author of the Gospel, three epistles, and Revelation.",
        lesson: "Love and truth are inseparable marks of true discipleship."
    },
    {
        name: "John the Baptist",
        description: "The forerunner of Jesus who preached repentance and baptized Him (Matthew 3).",
        lesson: "Prepare the way for God through repentance and bold witness."
    },
    {
        name: "Jonah",
        description: "A prophet who fled from God’s call and was swallowed by a great fish, then obeyed and preached in Nineveh.",
        lesson: "God’s mercy reaches even those who first run from His will."
    },
    {
        name: "Jonathan",
        description: "Son of King Saul and close friend of David (1 Samuel 31; 2 Samuel 1:19–26).",
        lesson: "True friendship is loyal and selfless, even in adversity."
    },
    {
        name: "Joseph",
        description: "The eleventh son of Jacob, sold by his brothers and later became ruler in Egypt (Genesis 30–50).",
        lesson: "God turns betrayal and suffering into purpose and salvation."
    },
    {
        name: "Joshua",
        description: "Successor of Moses who led Israel into the Promised Land.",
        lesson: "Courage and obedience to God bring victory over every challenge."
    },
    {
        name: "Josiah",
        description: "King of Judah who restored true worship after rediscovering God’s law.",
        lesson: "Renewal begins when God’s Word is restored to its rightful place."
    },
    {
        name: "Jubal",
        description: "The inventor of musical instruments (Genesis 4:21).",
        lesson: "Human creativity is a gift meant to glorify God."
    },
    {
        name: "Judah",
        description: "The fourth son of Jacob, ancestor of the royal line leading to the Messiah (Genesis 29:35; 49:8–12).",
        lesson: "From repentance and leadership comes God’s chosen line of blessing."
    },
    {
        name: "Judas Iscariot",
        description: "One of the twelve apostles who betrayed Jesus for thirty pieces of silver (Luke 22:3–6, 47–48).",
        lesson: "Greed and betrayal bring deep regret; repentance must be genuine."
    },
    {
        name: "Jude",
        description: "One of the twelve apostles and author of the Epistle of Jude.",
        lesson: "Stand firm in truth and contend for the faith."
    },
    {
        name: "Judith",
        description: "A courageous woman who saved her people by killing Holofernes.",
        lesson: "Faith and bravery can deliver a nation from oppression."
    },
    {
        name: "Laban",
        description: "Father of Leah and Rachel, father-in-law of Jacob (Genesis 29:16).",
        lesson: "Deceit leads to conflict, but God’s purpose still prevails."
    },
    {
        name: "Lazarus",
        description: "Brother of Mary and Martha, whom Jesus raised from the dead (John 11–12).",
        lesson: "Jesus has power over life and death—He is the resurrection."
    },
    {
        name: "Leah",
        description: "Jacob’s first wife and mother of six of his sons (Genesis 29).",
        lesson: "God sees the unloved and blesses them beyond expectation."
    },
    {
        name: "Levi",
        description: "The third son of Jacob and Leah, ancestor of the priestly tribe (Genesis 29:34).",
        lesson: "Consecration and devotion to God lead to lasting legacy."
    },
    {
        name: "Lot",
        description: "Abraham’s nephew who fled Sodom; his wife looked back and became a pillar of salt (Genesis 19).",
        lesson: "Half-hearted obedience and attachment to the past bring ruin."
    },
    {
        name: "Lot’s Wife",
        description: "The wife of Lot who turned into a pillar of salt for looking back at Sodom (Genesis 19).",
        lesson: "Looking back at sin prevents forward movement in faith."
    },
    {
        name: "Luke",
        description: "Physician, companion of Paul, and author of the Gospel of Luke and Acts.",
        lesson: "Faithful service and accurate testimony strengthen the Church."
    },
    {
        name: "Magus",
        description: "A magician or sorcerer of ancient times.",
        lesson: "True power and wisdom come only from God, not from magic or deception."
    },
    {
        name: "Malachi",
        description: "A prophet of the 5th century BC who called Israel back to covenant faithfulness.",
        lesson: "God deserves sincere worship, not empty rituals."
    },
    {
        name: "Manasseh",
        description: "The elder son of Joseph (Genesis 41:51).",
        lesson: "God causes us to forget our troubles when we trust His plan."
    },
    {
        name: "Mark",
        description: "One of the four Evangelists, author of the Gospel of Mark.",
        lesson: "Faithfulness in ministry leaves an enduring witness of Christ."
    },
    {
        name: "Martha",
        description: "Sister of Mary and Lazarus, busy with serving when Jesus visited (Luke 10:40).",
        lesson: "Service is good, but devotion to Jesus must come first."
    },
    {
        name: "Mary",
        description: "Sister of Martha and Lazarus, known for her devotion and listening heart (Luke 10:38–42; John 11:1–2).",
        lesson: "Sitting at Jesus’ feet brings true understanding and peace."
    },
    {
        name: "Mary Magdalene",
        description: "A woman from Magdala healed by Jesus and the first witness of His resurrection (Luke 8:2).",
        lesson: "Those forgiven much can love much and testify boldly."
    },
    {
        name: "Matthew",
        description: "A tax collector called by Jesus to be an apostle and author of the Gospel of Matthew (Matthew 9:9–13).",
        lesson: "Jesus calls even the outcast to follow Him and share His message."
    },
    {
        name: "Matthias",
        description: "Chosen to replace Judas Iscariot among the apostles (Acts 1:26).",
        lesson: "God restores and fills every place left vacant by failure."
    },
    {
        name: "Melchizedek",
        description: "Priest-king of Salem who blessed Abraham, a type of Christ (Genesis 14:18–19).",
        lesson: "Christ’s priesthood is eternal and righteous, like Melchizedek’s."
    },
    {
        name: "Meshach",
        description: "One of Daniel’s three companions delivered from Nebuchadnezzar’s fiery furnace (Daniel 3:12–30).",
        lesson: "God delivers those who refuse to bow to false gods."
    },
    {
        name: "Methuselah",
        description: "A patriarch who lived 969 years (Genesis 5:21–27).",
        lesson: "Long life alone is not enough; righteousness gives life meaning."
    },
    {
        name: "Micah",
        description: "A prophet of the 8th century BC who called for justice and humility before God.",
        lesson: "What God requires is justice, mercy, and a humble walk with Him."
    },
    {
        name: "Midian",
        description: "A son of Abraham (Genesis 25:1–2).",
        lesson: "Even distant descendants can become part of God’s unfolding plan."
    },
    {
        name: "Miriam",
        description: "Sister of Moses and Aaron, a prophetess who led Israel in song (Numbers 12:1–15).",
        lesson: "Worship and leadership must always remain humble before God."
    },
    {
        name: "Mordecai",
        description: "The cousin of Esther who saved the Jews from Haman's plot (Book of Esther).",
        lesson: "Faithful courage and loyalty can protect God’s people."
    },
    {
        name: "Moses",
        description: "The Hebrew prophet who led the Israelites out of Egypt and received God’s laws.",
        lesson: "Obedience to God’s calling brings deliverance and guidance."
    },
    {
        name: "Nabonidus",
        description: "Father of Belshazzar, last king of Babylon before Cyrus captured it in 539 BC.",
        lesson: "Worldly power is temporary; God’s plan prevails."
    },
    {
        name: "Naboth",
        description: "Inhabitant of Jezreel, murdered for refusing to sell his vineyard (1 Kings 21).",
        lesson: "Uprightness may provoke evil, but God sees and judges injustice."
    },
    {
        name: "Nahum",
        description: "A Hebrew prophet of the 7th century BC.",
        lesson: "God’s justice will prevail against the wicked."
    },
    {
        name: "Naomi",
        description: "Mother-in-law of Ruth (Ruth 1:2).",
        lesson: "Faithfulness and guidance bless those who follow God."
    },
    {
        name: "Naphtali",
        description: "Jacob's sixth son, born to Rachel's handmaid Bilhah (Genesis 30:7–8).",
        lesson: "God blesses all who come from His chosen line."
    },
    {
        name: "Nathan",
        description: "Prophet at David’s court, confronting him over sin and guiding the nation (2 Samuel 7:1–17; 12:1–15).",
        lesson: "Courageous truth-telling is essential for accountability."
    },
    {
        name: "Nathanael",
        description: "A Galilean, perhaps the apostle Bartholomew (John 1:45–51; 21:1).",
        lesson: "Honest and open hearts recognize Jesus as the Messiah."
    },
    {
        name: "Nebuchadnezzar",
        description: "King of Babylon who conquered Jerusalem and exiled the Jews (2 Kings 24–25).",
        lesson: "Pride before God brings humbling and eventual repentance."
    },
    {
        name: "Nehemiah",
        description: "Jewish official who led the rebuilding of Jerusalem’s walls in 444 BC.",
        lesson: "Faithful leadership restores communities through God’s guidance."
    },
    {
        name: "Nicodemus",
        description: "Pharisee and member of the Sanhedrin, who defended Jesus (John 8:50–52).",
        lesson: "Seeking truth quietly can lead to greater understanding of God."
    },
    {
        name: "Nimrod",
        description: "A mighty hunter famous for his prowess (Genesis 10:8–9).",
        lesson: "Human strength without God’s favor can lead to pride."
    },
    {
        name: "Noah",
        description: "Patriarch who built the Ark to survive the Flood with his family and animals (Genesis 6–8).",
        lesson: "Obedience to God saves lives and fulfills His plan."
    },
    {
        name: "Obadiah",
        description: "A Hebrew prophet who spoke against Edom’s pride.",
        lesson: "God judges pride and injustice, but protects His people."
    },
    {
        name: "Paul",
        description: "Apostle Saul of Tarsus, missionary to the Gentiles and author of many Epistles.",
        lesson: "God can transform past persecution into powerful ministry."
    },
    {
        name: "Peter",
        description: "Also called Simon Peter, fisherman turned apostle and leader of the early Church.",
        lesson: "Faithful service and repentance lead to leadership in God’s kingdom."
    },
    {
        name: "Philip",
        description: "Son of Herod the Great, ruler of part of Judaea (Luke 3:1).",
        lesson: "Even rulers and leaders can play roles in God’s plan."
    },
    {
        name: "Pontius Pilate",
        description: "Roman procurator who ordered Jesus’ crucifixion (?26–?36 AD).",
        lesson: "Moral compromise leads to unjust decisions."
    },
    {
        name: "Potiphar",
        description: "Egyptian officer who bought Joseph as a slave (Genesis 37:36).",
        lesson: "Positions of authority can influence God’s purposes."
    },
    {
        name: "Prodigal Son",
        description: "A wastrel son welcomed back on returning home in repentance (Luke 15:11–32).",
        lesson: "Repentance and humility restore relationships with God."
    },
    {
        name: "Queen of Sheba",
        description: "Queen who visited Solomon to test his wisdom (1 Kings 10:1–13).",
        lesson: "Wisdom and fear of the Lord attract respect and admiration."
    },
    {
        name: "Rachel",
        description: "Jacob’s second and best-loved wife, mother of Joseph and Benjamin (Genesis 29–35).",
        lesson: "Love and patience can produce God’s blessings in family life."
    },
    {
        name: "Rebecca",
        description: "Wife of Isaac and mother of Jacob and Esau (Genesis 24–27).",
        lesson: "Faithful action shapes God’s promises in family lineage."
    },
    {
        name: "Reuben",
        description: "Eldest son of Jacob and Leah, one of the twelve patriarchs (Genesis 29:30).",
        lesson: "Birthright and responsibility carry blessings and consequences."
    },
    {
        name: "Ruth",
        description: "Moabite woman who stayed with Naomi and married Boaz, becoming an ancestor of David.",
        lesson: "Loyalty, faith, and devotion lead to God’s providence."
    },
    {
        name: "Salome",
        description: "Daughter of Herodias, whose dancing led to John the Baptist’s death.",
        lesson: "Manipulation and indulgence in evil can bring deadly consequences."
    },
    {
        name: "Samson",
        description: "Judge of Israel, renowned for his strength, betrayed by Delilah (Judges 13–16).",
        lesson: "God-given gifts require obedience; otherwise, they can be lost."
    },
    {
        name: "Samuel",
        description: "Prophet, seer, and judge who anointed Israel’s first two kings (1 Samuel 1–3; 8–15).",
        lesson: "Faithful service and discernment guide nations according to God’s will."
    },
    {
        name: "Sapphira",
        description: "Wife of Ananias, struck dead for lying about offerings (Acts 5:1–10).",
        lesson: "Deceit and hypocrisy in God’s house bring severe consequences."
    },
    {
        name: "Sarah",
        description: "Wife of Abraham, mother of Isaac (Genesis 17:15–22).",
        lesson: "Faith and patience fulfill God’s promises even in old age."
    },
    {
        name: "Saul",
        description: "The first king of Israel (?1020–1000 BC), led against Philistines, conflicted with Samuel, died by his own hand.",
        lesson: "Even anointed leaders can fail when disobedient to God."
    },
    {
        name: "Seth",
        description: "Adam's third son, given in place of Abel (Genesis 4:25).",
        lesson: "God provides continuation and hope after loss."
    },
    {
        name: "Shadrach",
        description: "One of Daniel's companions, saved from Nebuchadnezzar's fiery furnace (Daniel 3:12–30).",
        lesson: "Faithfulness to God delivers from impossible situations."
    },
    {
        name: "Shem",
        description: "The eldest of Noah's three sons (Genesis 10:21).",
        lesson: "Lineage and obedience preserve God’s covenant."
    },
    {
        name: "Simeon",
        description: "The second son of Jacob and Leah.",
        lesson: "Every family member has a role in God’s plan."
    },
    {
        name: "Simon Magus",
        description: "Samaritan magician whose attempt to buy the Holy Ghost angered Peter (Acts 8:9–24).",
        lesson: "Spiritual gifts cannot be purchased; God values sincerity."
    },
    {
        name: "Simon Peter",
        description: "Full name of the apostle Peter, given by Christ (Matthew 16:17–18).",
        lesson: "Faithful leadership and confession of Christ bring strength."
    },
    {
        name: "Solomon",
        description: "King of Israel, son of David and Bathsheba, renowned for wisdom (10th century BC).",
        lesson: "Wisdom and humility honor God; pride leads to downfall."
    },
    {
        name: "Susanna",
        description: "Wife of Joachim, condemned for adultery by false accusation but saved by Daniel.",
        lesson: "God’s justice protects the innocent."
    },
    {
        name: "Tetragrammaton",
        description: "The Hebrew name for God revealed to Moses (YHWH), regarded as too sacred to pronounce.",
        lesson: "God’s name is holy and worthy of reverence."
    },
    {
        name: "Thaddeus",
        description: "One of the twelve apostles, also known as Jude (Matthew 10:3; Mark 3:18).",
        lesson: "Faithful service in God’s work leaves a lasting impact."
    },
    {
        name: "Thomas",
        description: "Also called Didymus, one of the twelve apostles, doubted Christ’s resurrection (John 20:24–29).",
        lesson: "Doubt can lead to deeper faith when met with Christ’s truth."
    },
    {
        name: "Tobit",
        description: "A pious Jew restored from blindness through Archangel Raphael.",
        lesson: "God provides guidance and healing through His messengers."
    },
    {
        name: "Tubal-cain",
        description: "Son of Lamech, first artificer of metals (Genesis 4:22).",
        lesson: "Human skill and creativity are gifts from God."
    },
    {
        name: "Uriah",
        description: "Hittite officer, killed on David’s orders so David could marry Bathsheba (2 Samuel 11).",
        lesson: "Injustice and betrayal have severe consequences."
    },
    {
        name: "Mary",
        description: "Mother of Jesus Christ.",
        lesson: "Faithful obedience brings God’s plan to fulfillment."
    },
    {
        name: "Zacharias",
        description: "Father of John the Baptist, temporarily struck dumb for lack of faith (Luke 1).",
        lesson: "Faith and trust in God are required for His promises."
    },
    {
        name: "Zebedee",
        description: "Father of apostles James and John (Matthew 4:21).",
        lesson: "Raising faithful children contributes to God’s work."
    },
    {
        name: "Zebulun",
        description: "Sixth son of Leah and Jacob, one of the 12 patriarchs (Genesis 30:20).",
        lesson: "Every child in God’s plan carries a purpose."
    },
    {
        name: "Zechariah",
        description: "Hebrew prophet of the late 6th century BC.",
        lesson: "Prophetic messages guide God’s people toward righteousness."
    },
    {
        name: "Zedekiah",
        description: "Last king of Judah, died in Babylonian captivity.",
        lesson: "Disobedience to God brings downfall and exile."
    },
    {
        name: "Zephaniah",
        description: "Prophet whose oracles warn of God’s judgment on Judah.",
        lesson: "God calls for repentance to avoid His judgment."
    },
    {
        name: "Zilpah",
        description: "Leah’s maidservant, mother of Gad and Asher (Genesis 30:10–13).",
        lesson: "God can use anyone to fulfill His purposes."
    }
];