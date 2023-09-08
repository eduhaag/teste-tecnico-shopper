import Knex from 'knex'
import { config } from './config/knex'

export const knex = Knex(config)