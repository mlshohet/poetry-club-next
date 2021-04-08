import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
	session: {
		jwt: true
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection('poets');

				const user = await usersCollection.findOne({ email: credentials.email })
				if(!user) {
					client.close();
					throw new Error('No profile found!');
					return;
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					client.close();
					throw new Error("Wrong credentials!");
					return;
				}

				// Returns an object for a web token and for the final authorization
				
				client.close();
				return {
					email: user.email
				};

			}
		})
	]
});