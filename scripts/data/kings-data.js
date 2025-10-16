/**
 * KINGS DATA - Biblical Kings Information
 * Contains comprehensive data about the kings of United Israel, Northern Kingdom (Israel), and Southern Kingdom (Judah)
 */

const allKingsData = {
    united: [
        { 
            name: "Saul", 
            order: 1, 
            description: "First King of Israel", 
            character: "Disobedient",
            reign: "40 years",
            biblicalRef: "1 Samuel 9 – 31",
            biography: `<div class="biography-content">
                <ul>
                    <li><strong>Role:</strong> Saul was the first king of Israel, chosen by God and anointed by the prophet Samuel.</li>
                    <li><strong>Character & Beginning of Reign:</strong>
                        <ul>
                            <li>He began his kingship as a humble man filled with the Holy Spirit.</li>
                            <li>However, within two years, pride got the better of him.</li>
                        </ul>
                    </li>
                    <li><strong>Disobedience & Consequence:</strong>
                        <ul>
                            <li>He deliberately disobeyed God's clear instructions.</li>
                            <li>As a result, he lost God's blessing <span class="verse-highlight">(1 Samuel 13:13–14)</span>.</li>
                        </ul>
                    </li>
                    <li><strong>Duration of Reign:</strong>
                        <ul>
                            <li>He reigned for about 40 to 42 years <span class="verse-highlight">(Acts 13:21)</span>.</li>
                        </ul>
                    </li>
                    <li><strong>End of Life:</strong>
                        <ul>
                            <li>His life ended during a war with the Philistines.</li>
                        </ul>
                    </li>
                </ul>
            </div>`
        },
        { 
            name: "David", 
            order: 2, 
            description: "King after God's heart", 
            character: "Righteous", 
            reign: "40 years",
            biblicalRef: "2 Samuel; 1 Kings 1 : 1 – 2 : 11; 1 Chronicles 11 – 29",
            biography: `<div class="biography-content">
                <ul>
                    <li><strong>Role:</strong> David was Israel's strongest king and was even called a man after God's heart <span class="verse-highlight">(Acts 13:22)</span>.</li>
                    <li><strong>Early Life & Anointing:</strong>
                        <ul>
                            <li>Though anointed as king at a young age, he didn't ascend the throne for 15 years <span class="verse-highlight">(1 Samuel 16:13)</span>.</li>
                            <li>During this time, he was:
                                <ul>
                                    <li>A shepherd</li>
                                    <li>A psalm writer</li>
                                    <li>A harpist</li>
                                    <li>A mighty warrior who led Saul's armies</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><strong>Challenges:</strong>
                        <ul>
                            <li>His potential made him a target of Saul's jealousy.</li>
                            <li>Saul's attempts to kill David forced him to live on the run.</li>
                        </ul>
                    </li>
                    <li><strong>Kingship:</strong>
                        <ul>
                            <li>When he finally became king:
                                <ul>
                                    <li>He reigned over the tribe of Judah for 7½ years <span class="verse-highlight">(2 Samuel 5:4–5)</span></li>
                                    <li>He reigned over the rest of Israel for 33 years <span class="verse-highlight">(1 Kings 2:10–11)</span></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>`
        },
        { 
            name: "Solomon", 
            order: 3, 
            description: "Wisest King", 
            character: "Wise", 
            reign: "40 years",
            biblicalRef: "1 Kings 2 : 12 – 11 : 43; 2 Chronicles 1 – 9",
            biography: `<div class="biography-content">
                <ul>
                    <li><strong>Role:</strong> Solomon, David's son, reigned for 40 years as the most prosperous of all Israel's kings.</li>
                    <li><strong>Blessings & Achievements:</strong>
                        <ul>
                            <li>When he first became king, God blessed him with:
                                <ul>
                                    <li>World-renowned wisdom</li>
                                    <li>Great wealth <span class="verse-highlight">(1 Kings 3:3, 7, 9)</span></li>
                                </ul>
                            </li>
                            <li>He built the famous Solomon's Temple in Jerusalem <span class="verse-highlight">(1 Kings 6)</span>.</li>
                        </ul>
                    </li>
                    <li><strong>Downfall:</strong>
                        <ul>
                            <li>Lust led to his downfall:
                                <ul>
                                    <li>He took hundreds of foreign wives and concubines</li>
                                    <li>They led him away from God toward pagan worship <span class="verse-highlight">(1 Kings 11:1–8)</span></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><strong>Consequence:</strong>
                        <ul>
                            <li>As a result, God would take part of Solomon's kingdom away from his son <span class="verse-highlight">(1 Kings 11:11–13)</span></li>
                        </ul>
                    </li>
                </ul>
            </div>`
        }
    ],
    israel: [
        { 
            name: "Jeroboam I", 
            order: 1, 
            description: "First King of Northern Kingdom", 
            character: "Rebellious", 
            reign: "22 years", 
            biblicalRef: "1 Kings 12:20, 25–33; 13–20",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Though God had promised the kingdom to Jeroboam, he turned from God and started a chain of evil influence during his 22-year reign.</p>
                <p><strong>Notable Actions:</strong></p>
                <ul>
                    <li>To prevent the Israelites from going to the Jerusalem temple (in Judah) to worship, he set up golden calves in both the northern and southern regions of his kingdom.</li>
                    <li>This blend of pagan worship and the worship of God caused a lot of confusion among the people.</li>
                </ul>
            </div>`
        },
        { 
            name: "Nadab", 
            order: 2, 
            description: "Son of Jeroboam I", 
            character: "Evil", 
            reign: "2 years", 
            biblicalRef: "1 Kings 15:25-28",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Nadab followed in the footsteps of his father Jeroboam.</p>
                <p><strong>Reign:</strong></p>
                <ul>
                    <li>Only reigned for two years.</li>
                    <li>He and Jeroboam's other relatives were assassinated by a man named Baasha (1 Kings 15:29).</li>
                </ul>
            </div>`
        },
        { 
            name: "Baasha", 
            order: 3, 
            description: "Killed Nadab", 
            character: "Evil", 
            reign: "24 years", 
            biblicalRef: "1 Kings 15:33-16:7",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Baasha took the throne by force and reigned for 24 years.</p>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>The prophet Jehu prophesied his downfall because Baasha had assassinated Jeroboam's family.</li>
                </ul>
            </div>`
        },
        { 
            name: "Elah", 
            order: 4, 
            description: "Son of Baasha", 
            character: "Evil", 
            reign: "2 years", 
            biblicalRef: "1 Kings 16:8-10",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Elah, Baasha's son, only reigned for two years.</p>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>His captain of chariots, Zimri, assassinated him and took the throne.</li>
                </ul>
            </div>`
        },
        { 
            name: "Zimri", 
            order: 5, 
            description: "Ruled 7 days", 
            character: "Evil", 
            reign: "7 days", 
            biblicalRef: "1 Kings 16:11-20",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Zimri destroyed all of Elah and Baasha's household to seize the throne.</p>
                <p><strong>Reign:</strong></p>
                <ul>
                    <li>His reign lasted only seven days.</li>
                </ul>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>The people discovered his actions and made Omri king instead.</li>
                    <li>Omri took an army and besieged the city of Tirzah where Zimri was.</li>
                    <li>In desperation, Zimri set his palace on fire and died there.</li>
                </ul>
            </div>`
        },
        { 
            name: "Omri", 
            order: 6, 
            description: "Built Samaria", 
            character: "Evil", 
            reign: "12 years", 
            biblicalRef: "1 Kings 16:21-28",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Omri wasn't much better than Zimri in morality, though he reigned for 12 years.</p>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>Omri had to deal with civil war when some of the people made a man named Tibni king.</li>
                    <li>Once Tibni died in battle, Omri united the people under himself.</li>
                </ul>
            </div>`
        },
        { 
            name: "Ahab", 
            order: 7, 
            description: "Married to Jezebel", 
            character: "Wicked", 
            reign: "22 years", 
            biblicalRef: "1 Kings 16:29-22:40",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Ahab was an evil king, known for his marriage to an idolatrous and cruel woman, Jezebel. During Ahab's 22-year reign, Jezebel championed the worship of Baal.</p>
                <p><strong>About Baal:</strong></p>
                <ul>
                    <li>A Canaanite god of fertility.</li>
                    <li>Worship involved idols, altars, animal sacrifices, sexual rites, and even sacrificing children.</li>
                </ul>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>God sent the prophet Elijah to warn Ahab of coming judgment: a drought lasting three years.</li>
                    <li>A dramatic showdown occurred between Elijah and the prophets of Baal on Mt. Carmel.</li>
                    <li>God sent fire from heaven to consume Elijah's sacrificial offering (1 Kings 18:38–39), showing His support and indicating that Ahab's kingdom would eventually be taken from him.</li>
                </ul>
            </div>`
        },
        { 
            name: "Ahaziah", 
            order: 8, 
            description: "Son of Ahab", 
            character: "Evil", 
            reign: "2 years", 
            biblicalRef: "1 Kings 22:51-2 Kings 1:18",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Ahaziah, Ahab's son, wasn't much better than his parents.</p>
                <p><strong>Reign:</strong></p>
                <ul>
                    <li>Two-year reign.</li>
                    <li>Continued to encourage national worship of Baal.</li>
                </ul>
            </div>`
        },
        { 
            name: "Jehoram (Joram)", 
            order: 9, 
            description: "Brother of Ahaziah", 
            character: "Evil", 
            reign: "12 years", 
            biblicalRef: "2 Kings 3-9",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Jehoram, Ahaziah's son, was also an evil king.</p>
                <p><strong>Reign:</strong></p>
                <ul>
                    <li>Reigned 12 years.</li>
                    <li>Faced attacks from enemy nations including Moabites and Syrians.</li>
                    <li>Assassinated by Jehu.</li>
                </ul>
            </div>`
        },
        { 
            name: "Jehu", 
            order: 10, 
            description: "Anointed by Elisha", 
            character: "Zealous", 
            reign: "28 years", 
            biblicalRef: "2 Kings 9-10",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> The prophet Elisha anointed Jehu king while Jehoram was still on the throne.</p>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>God commissioned Jehu to bring judgment on Ahab's family line (2 Kings 9:7–9, 24–27).</li>
                    <li>Tried to reform Israel but used deception: pretended to follow Baal, called a gathering, and killed all who attended (2 Kings 10:18–28).</li>
                </ul>
            </div>`
        },
        { 
            name: "Jehoahaz", 
            order: 11, 
            description: "Son of Jehu", 
            character: "Evil", 
            reign: "17 years", 
            biblicalRef: "2 Kings 13:1-9",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Jehoahaz started his 17-year reign at odds with God.</p>
                <p><strong>Notable Events:</strong></p>
                <ul>
                    <li>God allowed the Syrians to conquer Israel because of his wayward actions.</li>
                    <li>Jehoahaz cried out to God, and God delivered Israel in His mercy.</li>
                </ul>
            </div>`
        },
        { 
            name: "Jehoash (Joash)", 
            order: 12, 
            description: "Son of Jehoahaz", 
            character: "Evil", 
            reign: "16 years", 
            biblicalRef: "2 Kings 13:10-25",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Jehoash, also called Joash, was evil like his father Jehoahaz.</p>
                <p><strong>Reign:</strong></p>
                <ul>
                    <li>Fought against the Syrians.</li>
                    <li>Prophet Elisha prophesied Israel would gain some victories during his reign (2 Kings 13:14–19).</li>
                </ul>
            </div>`
        },
        { 
            name: "Jeroboam II", 
            order: 13, 
            description: "Long reign", 
            character: "Evil", 
            reign: "41 years", 
            biblicalRef: "2 Kings 14:23-29",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Jeroboam II, Jehoash's son, reigned for 41 years.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>Though he didn't follow God, he restored some of the coastal lands of Israel.</li>
                </ul>
            </div>`
        },
        { 
            name: "Zechariah", 
            order: 14, 
            description: "Ruled 6 months", 
            character: "Evil", 
            reign: "6 months", 
            biblicalRef: "2 Kings 15:8-12",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Zechariah, Jeroboam's son, reigned for six months.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>Killed by Shallum.</li>
                </ul>
            </div>`
        },
        { 
            name: "Shallum", 
            order: 15, 
            description: "Ruled 1 month", 
            character: "Evil", 
            reign: "1 month", 
            biblicalRef: "2 Kings 15:13-15",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Shallum, son of Jabesh, assassinated King Zechariah.</p>
                <h4>Reign:</h4>
                <ul>
                    <li>Reigned only one month.</li>
                    <li>Killed by Menahem.</li>
                </ul>
            </div>`
        },
        { 
            name: "Menahem", 
            order: 16, 
            description: "Paid tribute to Assyria", 
            character: "Evil", 
            reign: "10 years", 
            biblicalRef: "2 Kings 15:16-22",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Menahem, son of Gadi, reigned for ten years.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>Attacked by Assyrian King Pul.</li>
                    <li>Paid tribute to Pul to maintain peace.</li>
                </ul>
            </div>`
        },
        { 
            name: "Pekahiah", 
            order: 17, 
            description: "Son of Menahem", 
            character: "Evil", 
            reign: "2 years", 
            biblicalRef: "2 Kings 15:23-26",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Pekahiah, son of Menahem, reigned for two years.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>Murdered by Pekah, a captain in his army.</li>
                </ul>
            </div>`
        },
        { 
            name: "Pekah", 
            order: 18, 
            description: "Killed Pekahiah", 
            character: "Evil", 
            reign: "20 years", 
            biblicalRef: "2 Kings 15:27-31",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Pekah reigned for 20 years.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>Faced attacks from Assyrian King Tiglath-Pileser.</li>
                    <li>Murdered by Hoshea.</li>
                </ul>
            </div>`
        },
        { 
            name: "Hoshea", 
            order: 19, 
            description: "Last King of Israel", 
            character: "Evil", 
            reign: "9 years", 
            biblicalRef: "2 Kings 17",
            biography: `<div class="biography-content">
                <p><strong>Summary:</strong> Hoshea was the last king of Israel.</p>
                <h4>Notable Events:</h4>
                <ul>
                    <li>His reign ended with the fall of Samaria.</li>
                    <li>This event led to the Assyrian captivity in 722 BC.</li>
                </ul>
            </div>`
        }
    ],
    judah: [
        { name: "Rehoboam", order: 1, description: "Son of Solomon", character: "Foolish", reign: "17 years", biblicalRef: "1 Kings 11:43-14:31" },
        { name: "Abijah (Abijam)", order: 2, description: "Son of Rehoboam", character: "Evil", reign: "3 years", biblicalRef: "1 Kings 15:1-8" },
        { name: "Asa", order: 3, description: "Good King", character: "Good", reign: "41 years", biblicalRef: "1 Kings 15:9-24" },
        { name: "Jehoshaphat", order: 4, description: "Good King", character: "Good", reign: "25 years", biblicalRef: "1 Kings 22:41-50" },
        { name: "Jehoram (Joram)", order: 5, description: "Married Ahab's daughter", character: "Evil", reign: "8 years", biblicalRef: "2 Kings 8:16-24" },
        { name: "Ahaziah", order: 6, description: "Son of Jehoram", character: "Evil", reign: "1 year", biblicalRef: "2 Kings 8:25-9:29" },
        { name: "Athaliah (Queen)", order: 7, description: "Usurper Queen", character: "Wicked", reign: "6 years", biblicalRef: "2 Kings 11:1-16" },
        { name: "Joash (Jehoash)", order: 8, description: "Hidden as child", character: "Good/Bad", reign: "40 years", biblicalRef: "2 Kings 11:17-12:21" },
        { name: "Amaziah", order: 9, description: "Son of Joash", character: "Good/Bad", reign: "29 years", biblicalRef: "2 Kings 14:1-22" },
        { name: "Uzziah (Azariah)", order: 10, description: "Long reign", character: "Good", reign: "52 years", biblicalRef: "2 Kings 15:1-7" },
        { name: "Jotham", order: 11, description: "Son of Uzziah", character: "Good", reign: "16 years", biblicalRef: "2 Kings 15:32-38" },
        { name: "Ahaz", order: 12, description: "Very wicked", character: "Evil", reign: "16 years", biblicalRef: "2 Kings 16:1-20" },
        { name: "Hezekiah", order: 13, description: "Righteous King", character: "Righteous", reign: "29 years", biblicalRef: "2 Kings 18:1-20:21" },
        { name: "Manasseh", order: 14, description: "Most wicked, later repented", character: "Evil/Repentant", reign: "55 years", biblicalRef: "2 Kings 21:1-18" },
        { name: "Amon", order: 15, description: "Son of Manasseh", character: "Evil", reign: "2 years", biblicalRef: "2 Kings 21:19-26" },
        { name: "Josiah", order: 16, description: "Great Reformer", character: "Righteous", reign: "31 years", biblicalRef: "2 Kings 22:1-23:30" },
        { name: "Jehoahaz (Shallum)", order: 17, description: "Ruled 3 months", character: "Evil", reign: "3 months", biblicalRef: "2 Kings 23:31-35" },
        { name: "Jehoiakim", order: 18, description: "Puppet of Egypt", character: "Evil", reign: "11 years", biblicalRef: "2 Kings 23:36-24:7" },
        { name: "Jehoiachin (Jeconiah / Coniah)", order: 19, description: "Ruled 3 months", character: "Evil", reign: "3 months", biblicalRef: "2 Kings 24:8-17" },
        { name: "Zedekiah", order: 20, description: "Last King of Judah", character: "Evil", reign: "11 years", biblicalRef: "2 Kings 24:18-25:7" }
    ]
};