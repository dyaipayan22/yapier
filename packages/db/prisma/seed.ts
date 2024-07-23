import prisma from '../src/index';

async function seedAvailableTriggers() {
  try {
    await prisma.availableTriggers.create({
      data: {
        name: 'Webhook',
      },
    });
  } catch (error) {
    console.error('Error seeding available triggers', error);
    throw error;
  }
}

async function seedAvailableActions() {
  try {
    await prisma.availableActions.create({
      data: {
        name: 'Email',
      },
    });
  } catch (error) {
    console.error('Error seeding available actions', error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    console.log('Seeding data into database');
    await seedAvailableTriggers();
    await seedAvailableActions();
  } catch (error) {
    console.error('Error seeding database', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch((error) => {
  console.error(
    'An unexpected error occurred while seeding the database',
    error
  );
  process.exit(1);
});
