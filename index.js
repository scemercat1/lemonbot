const { 
  Client, GatewayIntentBits, 
  EmbedBuilder, ButtonBuilder, 
  ActionRowBuilder, ButtonStyle 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const levels = {
  "1345769207588978708": 100,
  "1495001353817165855": 50,
  "1488957524903198892": 30,
  "1488954404433559605": 0
};

function generateCode(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("!")) return;
  if (message.author.bot) return;

  if (message.content === "!securitycode") {

    const level = levels[message.author.id] || 0;

    if (level < 100) {
      return message.reply("❌ You need level 100 to use this command.");
    }

    const embed = new EmbedBuilder()
      .setTitle("Generate a SecurityCode")
      .setDescription("Press the button below to generate a secure code.");

    const button = new ButtonBuilder()
      .setCustomId("generate_code")
      .setLabel("Generate Code")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await message.reply({
      embeds: [embed],
      components: [row]
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "generate_code") {

    const code = generateCode();

    const embed = new EmbedBuilder()
      .setTitle("Generate a SecurityCode")
      .setDescription(`\`${code}\``);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
