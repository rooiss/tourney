import { promises as fs } from "fs";
import * as path from "path";
import { User } from "./src/entity/User";
import { getManager } from "typeorm";
import { setupDB } from "./src/setup-db";
import { TeamInviteStatus, TeamRole } from "./src/types/team";
import { createUser } from "./src/stores/users";

interface MockDataModel {
  users: {
    pseudoId: number;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    verified: boolean;
  }[];
  tournaments: {
    pseudoId: number;
    selectedDate: string;
    courts: number;
    location: {
      lat: number;
      lng: number;
      address: string;
    };
    creatorId: number;
    teams: {
      psuedoId: number;
      teamName: string;
      divisionId: string;
      teamUsers: {
        teamRole: TeamRole;
        userId: number;
      }[];
      teamInvites: {
        email: string;
        status: TeamInviteStatus;
        teamRole: TeamRole;
      }[];
    }[];
  };
}

const file = "mock-data-model.json";

const main = async () => {
  await setupDB();

  // bring in and parse the input file

  const content = await fs.readFile(path.resolve(__dirname, file), "utf-8");
  const mock: MockDataModel = JSON.parse(content);

  const pseudoIdMapping: { [pseudoId: number]: string } = {};

  // create the users and pseudoId => id mapping\
  const promises = mock.users.map(async (user) => {
    const userResult = await createUser(user);
    pseudoIdMapping[user.pseudoId] = userResult.id;

    if (user.verified) {
      userResult.verified = true;
      const entityManager = getManager();
      await entityManager.save(userResult);
    }
  });

  await Promise.all(promises);

  console.log(`pseudoIdMapping`, pseudoIdMapping);

  // create the tournaments

  // create the teams

  // create the team users

  // create the team invites
};

main();
