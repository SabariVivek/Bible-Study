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
        { name: "Jeroboam I", order: 1, description: "First King of Northern Kingdom", character: "Rebellious", reign: "22 years", biblicalRef: "1 Kings 11 : 26 - 14 : 20" },
        { name: "Nadab", order: 2, description: "Son of Jeroboam I", character: "Evil", reign: "2 years", biblicalRef: "1 Kings 15:25-28" },
        { name: "Baasha", order: 3, description: "Killed Nadab", character: "Evil", reign: "24 years", biblicalRef: "1 Kings 15:27-16:7" },
        { name: "Elah", order: 4, description: "Son of Baasha", character: "Evil", reign: "2 years", biblicalRef: "1 Kings 16:6-14" },
        { name: "Zimri", order: 5, description: "Ruled 7 days", character: "Evil", reign: "7 days", biblicalRef: "1 Kings 16:9-20" },
        { name: "Omri", order: 6, description: "Built Samaria", character: "Evil", reign: "12 years", biblicalRef: "1 Kings 16:16-28" },
        { name: "Ahab", order: 7, description: "Married to Jezebel", character: "Wicked", reign: "22 years", biblicalRef: "1 Kings 16:29-22:40" },
        { name: "Ahaziah", order: 8, description: "Son of Ahab", character: "Evil", reign: "2 years", biblicalRef: "1 Kings 22:51-2 Kings 1:18" },
        { name: "Joram (Jehoram)", order: 9, description: "Brother of Ahaziah", character: "Evil", reign: "12 years", biblicalRef: "2 Kings 3:1-9:26" },
        { name: "Jehu", order: 10, description: "Anointed by Elisha", character: "Zealous", reign: "28 years", biblicalRef: "2 Kings 9:1-10:36" },
        { name: "Jehoahaz", order: 11, description: "Son of Jehu", character: "Evil", reign: "17 years", biblicalRef: "2 Kings 13:1-9" },
        { name: "Jehoash (Joash)", order: 12, description: "Son of Jehoahaz", character: "Evil", reign: "16 years", biblicalRef: "2 Kings 13:10-14:16" },
        { name: "Jeroboam II", order: 13, description: "Long reign", character: "Evil", reign: "41 years", biblicalRef: "2 Kings 14:23-29" },
        { name: "Zechariah", order: 14, description: "Ruled 6 months", character: "Evil", reign: "6 months", biblicalRef: "2 Kings 15:8-12" },
        { name: "Shallum", order: 15, description: "Ruled 1 month", character: "Evil", reign: "1 month", biblicalRef: "2 Kings 15:10-15" },
        { name: "Menahem", order: 16, description: "Paid tribute to Assyria", character: "Evil", reign: "10 years", biblicalRef: "2 Kings 15:14-22" },
        { name: "Pekahiah", order: 17, description: "Son of Menahem", character: "Evil", reign: "2 years", biblicalRef: "2 Kings 15:23-26" },
        { name: "Pekah", order: 18, description: "Killed Pekahiah", character: "Evil", reign: "20 years", biblicalRef: "2 Kings 15:25-31" },
        { name: "Hoshea", order: 19, description: "Last King of Israel", character: "Evil", reign: "9 years", biblicalRef: "2 Kings 17:1-6" }
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