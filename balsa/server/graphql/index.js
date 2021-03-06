import { ApolloServer } from 'apollo-server-express';
import { merge } from 'lodash';
import { typeDefs as BaseType, directives as BaseDirectives } from './base';
import { typeDefs as AuthTypes, resolvers as AuthResolvers, directives as AuthDirectives } from './auth';
import { typeDefs as FileTypes, resolvers as FileResolvers } from './file';
import { typeDefs as SpreadsheetTypes, resolvers as SpreadsheetResolvers } from './spreadsheet';
import { typeDefs as FolderTypes, resolvers as FolderResolvers } from './folder';
import { typeDefs as ConfigTypes, resolvers as ConfigResolvers } from './config';
import { typeDefs as LogTypes, resolvers as LogResolvers } from './logging';
import { typeDefs as UserUploadTypes, resolvers as UserUploadResolvers } from './userUpload';
import { typeDefs as TemplateTypes, resolvers as TemplateResolvers } from './template';
import { IS_DEV } from '../constants';

const resolvers = {};
const directives = {};

const apolloServer = new ApolloServer({
  playground: IS_DEV,
  introspection: IS_DEV,
  typeDefs: [
    BaseType,
    AuthTypes,
    FileTypes,
    SpreadsheetTypes,
    FolderTypes,
    ConfigTypes,
    LogTypes,
    UserUploadTypes,
    TemplateTypes,
  ],
  resolvers: merge(
    resolvers,
    AuthResolvers,
    FileResolvers,
    FolderResolvers,
    ConfigResolvers,
    LogResolvers,
    UserUploadResolvers,
    SpreadsheetResolvers,
    TemplateResolvers,
  ),
  schemaDirectives: merge(directives, AuthDirectives, BaseDirectives),
  context: ({ req }) => ({
    user: req.user,
  }),
});

module.exports.apolloServer = apolloServer;
