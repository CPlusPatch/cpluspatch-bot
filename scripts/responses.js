module.exports.default = async (message, language) => {
	const triggers = require(`../locales/${language}_triggers.json`);
	let msg = message.content;

	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		// Has a 30% chance of respnding to a trigger
		if (msg.toLowerCase().includes(trigger.toLowerCase()) && Math.random() < 0.3) {
			// We begin typing to add a more realistic bot
			message.channel.sendTyping();
			// Waits 2s
			await new Promise(r => setTimeout(r, 2000));

			if (typeof triggers[trigger] == "string") reply = triggers[trigger];

			if (Array.isArray(triggers[trigger])) reply = triggers[trigger][Math.floor(Math.random() * triggers[trigger].length)];

			// Split selected reply into chunks of 1800 characters
			const chunks = require('chunk-text')(reply, 1800);
			for (let chunk in chunks) {
				// Send each chunk
				message.channel.send(chunks[chunk]);
			}
		}
	}
	if (msg.toLowerCase().includes("story of cpluspatch")) {
		message.channel.sendTyping();

		const chunks = require('chunk-text')("Ever since I was a wee lad, I noticed my penis was a bit large. I thought it was normal, until my mom bathed me with my brother and I saw his little wee wee compared to mine, I couldn't help but point at it and mock it. A few months later when I started kindergarden, the teacher inspected our cocks for the monthly cock inspection, and noticed my large dick. I was very young but I could still see he was very envyous of my humongous cock, knowing he will never be as big, he called my mom and told her a doctor should see my penis. The doctor said he had never seen such an amazing specimen of a dong, that was the first moment I saw pride in my mom's eyes. I cherish these memories, as the cock inspection was the pinnacle of any month for me, seeing all the other pathetic little weiners. I loved watching the other kids take quick glances of my cock in fear and shame. A few years later when I was about 11 years old, my penis has started to become a burden for me. Having a 24.089 inch dick in 6th grade is no joke, I had to come up with creative ideas of where to hide the magnificent beast. Usually I hid it inside the right leg of my pants, kids always thought it was weird how my right leg was so \"muscular\" compared to my other, which meant I had to workout only my left leg in order to not arouse suspicion. I remember I went home depressed one day, crying to god on why did he curse me with such a shaft. I was tearing my pants with anger, when I started to feel tingly sensation in my penis. I started rubbing it, and suddenly it GREW EVEN LONGER, I was devestated because I thought it was already too large, but the feeling I had when I was rubbing it was too good to stop. I started holding it with both my hands and stroking it, but it was not enough, I could not satisfy my monster with mere hands, so I began using my feet too. The feeling was incredible, god was on my side again. As I was rubbing it faster and faster, I thought of my science teacher. My cock was throbbing, my nipples erect, my eyes wide and open. I was on my bed at the time, and I felt my Johnson about to erupt with tremendous force, I didn't know what to do so I hid under the bed, and then I came. It was like 4th of july. At first the stream was steady, of white cream in about 1 liter per second, then it was chaos. My penis was going up and down dancing with explosions of cum(Only later that day I found out my grandpa died at that moment of a heart attack because the sounds reminded him of bastogne when he was fighting the Germans). After a few second I realized I might drown because my juice covered the whole floor about two inch deep, I quickly slid across pools of cum gasping for air, I stood up and finally my cum gun started to relax. My mom came into the room shocked and disgusted, she yelled at me that I must see a doctor and get my manhood shortend or even removed. We had a fight for about three hours not noticing my grandpa was awfully quiet. The day after my grandfather's funeral, I came to the doctor's office, and told him my story. After a lengthy cock inspection, he said that I have a rare condition, which makes my cock grow exponentially with each year, width and length. He calculated that my cock would weigh 200 kg when I turn 30, which is about the maximum weight my spine can support, beyond that and it would fracture and I'll die. I asked him if I could remove it, but he said no because I would die of blood loss. He also said I need to do blood transfusions everyday to feed my absolute unit of a scholng the blood it needs. Needless to say I was devestated, my once blessing, became a curse, again. One day when I was 16, I was in my math class when I heard a terrible noise, it reminded me of the first time I was beating my meat, but it turns out it was just a gunshot. Kids all around me where shouting that there was a school shooter. I immediately got up and ran to the door, carrying my pack with my hands. Suddenly I heard shots very close to my ears, and saw dead bodies on the ground, so I ran into the closest door which was the janitor's room, closed the door and hid under the table making as little noise as possible. Little did I know, my crush was under the same table, hiding there in fear, when she saw me she almost screamed, but I put my hand over her mouth and told her to be quiet. I heard the shooter opening the door slowly and looking for me. I was completely silent, but then I noticed my crush's incredible bajongas, and I felt my cock starting to throb and expand. She seemed to notice, and I could see that she was impressed with my goofy goober. Her facial expression made my ding dong enlarge even more and I could feel my pants starting to tear apart. My shclong abong seemed to send electro-magnetic waves all over the room because the light above us started to flicker with every throb of my cock. The shooter noticed that and walked to our table. I knew I had to do something quickly or me, my crush, and my beaver basher would all die. Then it hit me, and I knew what I had to do. I looked over to my crush, and I started playing with her milkers. At first she was trying to resist, but then she figured out what I was trying to do and played along. My cock grew more and more, and when I felt it about to burst out of my pants. I got up and looked straight at the shooter. He hesitated for a single moment, which cost him his life. My pants exploded as my sexcalibur shot out a single hardened white cum shaped like a 7.62 mm sniper bullet right into the shooter's head. I was about to celebrate but then I noticed the smell of smoke in the air, turns out my massive cock shot not only the shooter, but also a gas pipe that was in the vicinity. Fire was all around us, as I held my crush close, I knew there was no way both of us would get out of there, so there was only one option. \"Get in!\" I said. \"What?\" She asked. \"Get in! There is no time!\" I said and pointed to my foreskin. She climbed inside the pocket between my foreskin and my cock. And I started running, breathing smoke and caughing, kicking doors and running through hallways, longing for fresh air. Finally I got out of the school, and I saw everyone looking at me and my dong. I slowly walked to the benches, and sat down to breath. Then I saw my crush's mother, and she asked me where her daughter is. I got up, and said \"I know where she is!\". I pulled my foreskin and there she was. I expected to hear claps and cheers, but when I didn't, I looked at my crush and saw she was dead. Turns out she suffocated inside my yogurt hose. The police arrested me, and here I am, with my massive schlong and 15 years in prison. If your penis is small, do not despair, for at least you did not have to go through what I did.", 1800);
		for (let chunk in chunks) {
			// Send each chunk
			message.channel.sendTyping();
			await new Promise(r => setTimeout(r, 5000));
			message.channel.send(chunks[chunk]);
		}
	}
	// Auto spam "monke" in chat when the word "monke" is mentioned



};