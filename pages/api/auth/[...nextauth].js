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
					throw new Error('Profile not found.');
					return;
				}

				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					client.close();
					throw new Error("Invalid email, or password.");
					return;
				}

				// Returns an object for a web token and for the final authorization
				
				client.close();
				const token = {
					email: user.email,
					userId: user._id
				};

				return token;
			}
		})
	],

	callbacks: {
		async jwt(token, user) {
			if (user) {
				token.userId = user.userId;
			}
			return token;
		},

		async session(session, token) {
			session.user.userId = token.userId;
			return session;
		}
	}

});


