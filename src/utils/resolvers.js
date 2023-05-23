const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { auth } = require('../middleware');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findOne({ _id: context.user._id });
            return user;
        }
        throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AuthenticationError("Can't find this user");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw new AuthenticationError('Wrong password!');
        }

        const token = signToken(user);
        auth.login(token); // Save token to local storage
        return { token, user };
    },

        addUser: async (parent, { username, email, password }) => 
        
        {
            const user = await User.create({ username, email, password });

            const token = signToken(user);
            auth.login(token); // Save token to local storage
                return { token, user };
        },

        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: input } },
                    { new: true, runValidators: true }
        );
            return updatedUser;
        }

    throw new AuthenticationError('Not logged in');
    },
},
};

module.exports = resolvers;
