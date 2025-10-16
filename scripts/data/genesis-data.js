/**
 * GENESIS-DATA.JS - Complete Genesis Book Content
 * Contains the introduction and all chapters with verses from EasyEnglish Bible
 */

const genesisData = {
    name: "Genesis",
    testament: "Old",
    category: "Law",
    chapters: 50,
    author: "Moses",
    theme: "Beginnings",
    
    // Introduction content from the main page
    introduction: {
        title: "About the Book of Genesis",
        content: `Genesis is the first book in the Bible. The word 'Genesis' means 'beginning'.

Genesis is a book about events that happened a long time ago. It tells us about the lives of many important people. It tells us about the first humans, Adam and Eve, and their descendants, Cain, Abel and Noah. It also tells us about Abraham and Sarah, and Abraham's sons, Isaac and Ishmael. It tells us about Jacob and how God changed his name to Israel. Jacob's sons became the ancestors of the 12 tribes of Israel. It tells us much about Joseph who was one of Jacob's sons.

The Book of Genesis also teaches us many important things that we need to know. It teaches us about the world, about ourselves, and about God.

It explains that God made the world. It tells us that God filled the world with beautiful plants and animals. It tells us that he made men and women. Everything that God made was very good.

It explains how the first man and woman refused to obey God. And it explains that everyone has had trouble and pain since that time.

It also tells us about God's promise to forgive people and to bless them. And it tells us that God decided to send a special person to save people.`
    },
    
    // Chapters with their content sections
    chapters_list: [
        {
            chapter: 1,
            title: "God makes the earth",
            url: "https://www.easyenglish.bible/bible/easy/genesis/1/",
            sections: [
                {
                    verses: "1:1-2",
                    content: "In the beginning, God made the heavens and the earth. The earth was without shape and it was empty. Deep water covered the earth and everywhere was dark. The Spirit of God moved above the water."
                },
                {
                    verses: "1:3-5",
                    content: "God said, 'There will be light!' And there was light. God saw that the light was good. He caused the light and the dark to be separate. God called the light 'day'. He called the dark 'night'. Evening passed and then it was morning. That was the first day."
                },
                {
                    verses: "1:6-8",
                    content: "Then God said, 'A wide space will appear between the waters. So the waters will be in two separate places.' So God made this wide space. He made the water under the space separate from the water that was above it. What God said happened. God called the wide space 'sky'. Evening passed and then it was morning. That was the second day."
                },
                {
                    verses: "1:9-13",
                    content: "God said, 'The water that is under the sky will come together in one place. Then dry ground will appear.' And what God said happened. God called the dry ground 'land'. He called the water that had come together 'sea'. God looked at what he had made. He saw that it was good. Then God said, 'The land will cause plants to grow. There will be plants with their seeds and trees with their fruits. Each kind of plant and tree will have its own seeds and fruits.' And what God said happened. All kinds of plants and trees began to grow in the ground. The plants made seeds. The trees made fruits with seeds in them. Each plant made its own kind of seeds. God looked at what he had made. He saw that it was good. Evening passed and then it was morning. That was the third day."
                },
                {
                    verses: "1:14-19",
                    content: "God said, 'There will be lights all across the sky. They will make the day different from the night. They will show the seasons, days and years. The lights in the sky will give light to the earth.' And what God said happened. God made two great lights. The brighter light ruled over the day. The less bright light ruled over the night. God also made the stars. God put all these lights in the sky to shine their light on the earth. They were to rule over the day and night. They were to make the time of light separate from the time of dark. God looked at what he had made. He saw that it was good. Evening passed and then it was morning. That was the fourth day."
                },
                {
                    verses: "1:20-23",
                    content: "God said, 'The waters will become full with many living things. Birds will appear and fly above the earth, all across the sky.' God made big animals to live in the sea. He made every different kind of living thing that filled the sea. He made every different kind of bird to fly in the sky. God looked at what he had made. He saw that it was good. God blessed the animals and the birds. He said to them, 'Give birth to many young ones, so that you grow in number. Fill all the water in the seas. The birds also should become very many, all across the earth.' Evening passed and then it was morning. That was the fifth day."
                },
                {
                    verses: "1:24-31",
                    content: "God said, 'Different kinds of animals will now appear on the land. There will be farm animals and wild animals. There will also be other small animals that move along the ground. There will be many kinds of animals and each kind will be different.' And what God said happened. God made the different kinds of wild animals and the different kinds of farm animals. He made all the different kinds of animals that move along the ground. God looked at what he had made. He saw that it was good. Then God said, 'We will make humans so that they are very much like us. They will rule over the fish in the sea and over the birds in the sky. They will rule over the farm animals. They will rule over the whole earth and all the animals that move along the ground.' God made humans. He made them to be like himself. He made some of them males and some of them females. God blessed them. He said to them, 'Give birth to children. Grow in number. Fill the earth and rule over it. Rule over the fish in the sea. Rule over the birds in the sky. Rule over every different kind of living animal that moves along the ground.' Then God said, 'Listen! I now give to you every plant on the earth as your food. I give you every plant that has seeds in it. I give you every tree that has fruit with a seed in it. I give them to you for your food. I give to the animals green plants for their food. It will be food for all the animals on the earth, all the birds in the sky and all the animals that move along the ground. Everything that has life may eat every kind of green plant.' And what God said happened. God looked at everything that he had made. He saw that it was very good. Evening passed. And then it was morning. That was the sixth day."
                }
            ]
        },
        {
            chapter: 2,
            title: "God makes a man and a woman",
            url: "https://www.easyenglish.bible/bible/easy/genesis/2:4-25/",
            placeholder: true // Indicates this needs to be fetched
        },
        {
            chapter: 3,
            title: "The man and the woman turn away from God",
            url: "https://www.easyenglish.bible/bible/easy/genesis/3:1-24/",
            placeholder: true
        },
        {
            chapter: 4,
            title: "Cain and Abel",
            url: "https://www.easyenglish.bible/bible/easy/genesis/4:1-7/",
            placeholder: true
        },
        {
            chapter: 5,
            title: "The descendants of Adam",
            url: "https://www.easyenglish.bible/bible/easy/genesis/5:1-6:8/",
            placeholder: true
        }
        // Additional chapters would be added here as needed
    ],
    
    // Chapter links extracted from the main page
    chapterLinks: [
        { title: "God makes the earth", url: "https://www.easyenglish.bible/bible/easy/genesis/1:1-2:3/" },
        { title: "God makes a man and a woman", url: "https://www.easyenglish.bible/bible/easy/genesis/2:4-25/" },
        { title: "The man and the woman turn away from God", url: "https://www.easyenglish.bible/bible/easy/genesis/3:1-24/" },
        { title: "Cain and Abel", url: "https://www.easyenglish.bible/bible/easy/genesis/4:1-7/" },
        { title: "Cain kills Abel", url: "https://www.easyenglish.bible/bible/easy/genesis/4:8-16/" },
        { title: "The descendants of Cain", url: "https://www.easyenglish.bible/bible/easy/genesis/4:17-24/" },
        { title: "The birth of Seth", url: "https://www.easyenglish.bible/bible/easy/genesis/4:25-26/" },
        { title: "The descendants of Adam", url: "https://www.easyenglish.bible/bible/easy/genesis/5:1-6:8/" },
        { title: "God saves Noah", url: "https://www.easyenglish.bible/bible/easy/genesis/6:9-22/" },
        { title: "God destroys people and animals", url: "https://www.easyenglish.bible/bible/easy/genesis/7:1-24/" },
        { title: "The deep water goes away", url: "https://www.easyenglish.bible/bible/easy/genesis/8:1-19/" },
        { title: "God makes a promise to Noah", url: "https://www.easyenglish.bible/bible/easy/genesis/8:20-22/" },
        { title: "God's covenant with Noah", url: "https://www.easyenglish.bible/bible/easy/genesis/9:1-17/" },
        { title: "Noah's sons", url: "https://www.easyenglish.bible/bible/easy/genesis/9:18-10:1/" },
        { title: "Japheth's family", url: "https://www.easyenglish.bible/bible/easy/genesis/10:2-5/" },
        { title: "Ham's family", url: "https://www.easyenglish.bible/bible/easy/genesis/10:6-20/" },
        { title: "Shem's family", url: "https://www.easyenglish.bible/bible/easy/genesis/10:21-32/" },
        { title: "The tower in Babel", url: "https://www.easyenglish.bible/bible/easy/genesis/11:1-9/" },
        { title: "Shem's family", url: "https://www.easyenglish.bible/bible/easy/genesis/11:10-26/" },
        { title: "Terah's family", url: "https://www.easyenglish.bible/bible/easy/genesis/11:27-32/" },
        { title: "Abram leaves Haran", url: "https://www.easyenglish.bible/bible/easy/genesis/12:1-9/" },
        { title: "Abram and Sarai in Egypt", url: "https://www.easyenglish.bible/bible/easy/genesis/12:10-20/" },
        { title: "Abram and Lot go different ways", url: "https://www.easyenglish.bible/bible/easy/genesis/13:1-18/" },
        { title: "Abram at war with the kings", url: "https://www.easyenglish.bible/bible/easy/genesis/14:1-12/" },
        { title: "Abram and Melchizedek", url: "https://www.easyenglish.bible/bible/easy/genesis/14:13-24/" },
        { title: "The Lord's covenant with Abram", url: "https://www.easyenglish.bible/bible/easy/genesis/15:1-21/" },
        { title: "Sarai and Hagar", url: "https://www.easyenglish.bible/bible/easy/genesis/16:1-16/" },
        { title: "God changes Abram's name to Abraham", url: "https://www.easyenglish.bible/bible/easy/genesis/17:1-8/" },
        { title: "Circumcision", url: "https://www.easyenglish.bible/bible/easy/genesis/17:9-14/" },
        { title: "God changes Sarai's name to Sarah", url: "https://www.easyenglish.bible/bible/easy/genesis/17:15-27/" },
        { title: "God promises a son to Abraham", url: "https://www.easyenglish.bible/bible/easy/genesis/18:1-15/" },
        { title: "God decides to punish the people in Sodom", url: "https://www.easyenglish.bible/bible/easy/genesis/18:16-33/" },
        { title: "Lot leaves Sodom", url: "https://www.easyenglish.bible/bible/easy/genesis/19:1-29/" },
        { title: "Lot and his daughters", url: "https://www.easyenglish.bible/bible/easy/genesis/19:30-38/" },
        { title: "Abraham and Abimelech", url: "https://www.easyenglish.bible/bible/easy/genesis/20:1-18/" },
        { title: "Abraham's sons", url: "https://www.easyenglish.bible/bible/easy/genesis/21:1-21/" },
        { title: "Abraham and Abimelech make an agreement together", url: "https://www.easyenglish.bible/bible/easy/genesis/21:22-34/" },
        { title: "Abraham and Isaac", url: "https://www.easyenglish.bible/bible/easy/genesis/22:1-24/" },
        { title: "Sarah dies and Abraham buries her", url: "https://www.easyenglish.bible/bible/easy/genesis/23:1-20/" },
        { title: "A wife for Isaac", url: "https://www.easyenglish.bible/bible/easy/genesis/24:1-67/" },
        { title: "Abraham dies", url: "https://www.easyenglish.bible/bible/easy/genesis/25:1-11/" },
        { title: "Ishmael's family", url: "https://www.easyenglish.bible/bible/easy/genesis/25:12-18/" },
        { title: "Jacob and Esau", url: "https://www.easyenglish.bible/bible/easy/genesis/25:19-34/" },
        { title: "Isaac and Abimelech", url: "https://www.easyenglish.bible/bible/easy/genesis/26:1-35/" },
        { title: "Isaac blesses Jacob", url: "https://www.easyenglish.bible/bible/easy/genesis/27:1-46/" },
        { title: "Jacob and Esau", url: "https://www.easyenglish.bible/bible/easy/genesis/28:1-9/" },
        { title: "Jacob's journey", url: "https://www.easyenglish.bible/bible/easy/genesis/28:10-22/" },
        { title: "Jacob and Laban", url: "https://www.easyenglish.bible/bible/easy/genesis/29:1-20/" },
        { title: "Jacob marries Leah and Rachel", url: "https://www.easyenglish.bible/bible/easy/genesis/29:21-35/" },
        { title: "Jacob's family", url: "https://www.easyenglish.bible/bible/easy/genesis/30:1-24/" },
        { title: "Jacob's sheep", url: "https://www.easyenglish.bible/bible/easy/genesis/30:25-43/" },
        { title: "Jacob runs away from Laban", url: "https://www.easyenglish.bible/bible/easy/genesis/31:1-55/" },
        { title: "Jacob's journey home", url: "https://www.easyenglish.bible/bible/easy/genesis/32:1-32/" },
        { title: "Jacob meets Esau", url: "https://www.easyenglish.bible/bible/easy/genesis/33:1-20/" },
        { title: "Dinah", url: "https://www.easyenglish.bible/bible/easy/genesis/34:1-31/" },
        { title: "Jacob goes back to Bethel", url: "https://www.easyenglish.bible/bible/easy/genesis/35:1-29/" },
        { title: "Esau's family", url: "https://www.easyenglish.bible/bible/easy/genesis/36:1-43/" },
        { title: "Joseph and his brothers", url: "https://www.easyenglish.bible/bible/easy/genesis/37:1-36/" },
        { title: "Judah's family", url: "https://www.easyenglish.bible/bible/easy/genesis/38:1-30/" },
        { title: "Joseph in Egypt", url: "https://www.easyenglish.bible/bible/easy/genesis/39:1-23/" },
        { title: "Joseph tells two people what their dreams mean", url: "https://www.easyenglish.bible/bible/easy/genesis/40:1-23/" },
        { title: "Pharaoh's dreams", url: "https://www.easyenglish.bible/bible/easy/genesis/41:1-57/" },
        { title: "Joseph's brothers go to Egypt", url: "https://www.easyenglish.bible/bible/easy/genesis/42:1-38/" },
        { title: "Joseph's brothers return to Egypt", url: "https://www.easyenglish.bible/bible/easy/genesis/43:1-34/" },
        { title: "Joseph tests his brothers", url: "https://www.easyenglish.bible/bible/easy/genesis/44:1-34/" },
        { title: "Joseph says who he is", url: "https://www.easyenglish.bible/bible/easy/genesis/45:1-28/" },
        { title: "Joseph's whole family in Egypt", url: "https://www.easyenglish.bible/bible/easy/genesis/46:1-34/" },
        { title: "Joseph works well for his master Pharaoh", url: "https://www.easyenglish.bible/bible/easy/genesis/47:1-31/" },
        { title: "Jacob blesses Joseph's sons", url: "https://www.easyenglish.bible/bible/easy/genesis/48:1-22/" },
        { title: "Jacob blesses his sons", url: "https://www.easyenglish.bible/bible/easy/genesis/49:1-2/" },
        { title: "Reuben", url: "https://www.easyenglish.bible/bible/easy/genesis/49:3-4/" },
        { title: "Simeon and Levi", url: "https://www.easyenglish.bible/bible/easy/genesis/49:5-7/" },
        { title: "Judah", url: "https://www.easyenglish.bible/bible/easy/genesis/49:8-12/" },
        { title: "Zebulun", url: "https://www.easyenglish.bible/bible/easy/genesis/49:13/" },
        { title: "Issachar", url: "https://www.easyenglish.bible/bible/easy/genesis/49:14-15/" },
        { title: "Dan", url: "https://www.easyenglish.bible/bible/easy/genesis/49:16-18/" },
        { title: "Gad", url: "https://www.easyenglish.bible/bible/easy/genesis/49:19/" },
        { title: "Asher", url: "https://www.easyenglish.bible/bible/easy/genesis/49:20/" },
        { title: "Naphtali", url: "https://www.easyenglish.bible/bible/easy/genesis/49:21/" },
        { title: "Joseph", url: "https://www.easyenglish.bible/bible/easy/genesis/49:22-26/" },
        { title: "Benjamin", url: "https://www.easyenglish.bible/bible/easy/genesis/49:27-28/" },
        { title: "Jacob dies and Joseph buries him", url: "https://www.easyenglish.bible/bible/easy/genesis/49:29-50:21/" },
        { title: "Joseph dies", url: "https://www.easyenglish.bible/bible/easy/genesis/50:22-26/" }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = genesisData;
}