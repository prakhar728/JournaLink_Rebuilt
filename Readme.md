# JOURNALINK
Rewarding the Hustle!

# Project Description
In a data-driven world, JournaLink incentivizes data for the users. It consists of a dataDAO, where any could create a dao and start prompts with deadlines and locked rewards. The users can become part of the dao by contributing data to it. In the end, they get rewarded for their contributions. Next, the platform enables anyone to become a journalist! They can upload News, add tags, add videos - upload them, and even record them live. They get incentives through like. The Journalists can even go live whenever they want!

# How it's Made
For the base Tech Stack, I used a combination of next.js + Typescript. I also used some libraries like Wagmi, Viem, and Rainbow Kit to enable smooth interaction with the blockchain and to get some abstraction. Firstly, the smart Contracts are deployed over the @FVM chain dynamically. For every dao created a new smart contract for that dao is prepared and deployed over the Calibration testnet, this is done to ensure the funds that are locked are not open to security threats and can easily be managed by the dao owner. The details of the dao randing from images, heading to important prompts are all stored on-chain using @Tableland. I made heavy use of @Tableland and its SQL abilities to store information about Daos, and the Prompts created in them.

Next up the journaling sections are based on Tableland itself and store a lot of data leveraging its SQL API. I also made use of Lighthouse storage. They have an amazing SDK which enables you to store data as well as make Storage deals easily. @LighthouseStorage helped to make easy data storage and storage dealing, which was required for uploading the requirements of the dao prompts as well as when users took part in daos and contributed data. Overall, @ENS was also used to get avatar, and ETH names which could enable us to give a simple identity to the news reporter. There was tremendous support by the @Huddle01 which played a major role on the news side. Not only did it enable users to record a video whenever they want, they can go live at anywhere and anytime using Huddle's SDK.


# RECREATE IT LOCALLY
1. You don't have to make use of the blockchain folder. It was used to write and intially deploy the smart contract.
2. FILL THE .env file like the .env.local.
3. Run `npm i`
4. Run `npm run dev`.
5. It's on! Local Host 3000. 
6. I've not changed the tabeland table names so that you can interact freely. 