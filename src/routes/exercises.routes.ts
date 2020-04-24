import { FastifyInstance, Plugin } from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

export enum ExerciseTypes {
  /**
   * With regular weight
   */
  Default,

  /**
   * Exercise is being done with body weight, but additionally
   * one can use some weight to make exercise `harder` to do
   */
  WithAdditionalWeight,

  /**
   * Exercise is being done with body weight, but additionally
   * one can use some weight to make exercise `simpler` to do
   */
  WithNegativeWeight,
}

const DEFAULT_EXERCISE_LIST: Array<{ name: string; type?: ExerciseTypes }> = [
  { name: 'Приседания' },
  { name: 'Выпады с гантелями' },
  { name: 'Выпады в Смите' },
  { name: 'Болгарские приседания' },
  { name: 'Румынская становая тяга' },
  { name: 'Классическая становая тяга' },
  { name: 'Тяга «сумо»' },
  { name: 'Сквозная тяга' },
  { name: 'Разведения ног в тренажере' },
  { name: 'Сведения ног в тренажере' },
  { name: 'Ягодичный мост' },
  { name: 'Гиперэкстензия' },
  { name: 'Обратная гиперэкстензия' },
  { name: 'Вертикальная тяга верхнего блока' },
  { name: 'Горизонтальная тяга верхнего блока' },
  { name: 'Тяга верхнего блока в наклоне' },
  { name: 'Жим лежа' },
  { name: 'Бабочка' },
  { name: 'Подъем гантелей на бицепс' },
  { name: 'Подъем штанги на бицепс' },
  { name: 'Сгибания ног в тренажере лежа' },
  { name: 'Сгибания ног в тренажере сидя' },
  { name: 'Разгибание ног в тренажере сидя' },
  { name: 'Французский жим' },
  { name: 'Подтягивания с суппортом', type: ExerciseTypes.WithNegativeWeight },
  { name: 'Подтягивания', type: ExerciseTypes.WithAdditionalWeight },
  { name: 'Жим платформы ногами лежа' },
  { name: 'Тяга штанги к поясу в наклоне' },
  { name: 'Махи гантелями в стороны' },
  { name: 'Жим гантелей над головой' },
  { name: 'Жим гантелей на наклонной скамье' },
  { name: 'Отжимания на брусьях', type: ExerciseTypes.WithAdditionalWeight },
  { name: 'Сведения в кроссоверы снизу вверх' },
  { name: 'Подъем гантелей перед собой' },
  { name: 'Молот в блоке на веревке' },
  { name: 'Фронтальные приседания' },
  { name: 'Тяга блока к лицу' },
  { name: 'Разведения гантелей в стороны' },
  { name: 'Тяга верхнего блока узким хватом' },
  { name: 'Пулловер' },
  { name: 'Разведения гантелей сидя в наклоне' },
  { name: 'Обратные отжимания', type: ExerciseTypes.WithAdditionalWeight },
  { name: 'Разгибания из-за головы' },
  { name: 'Разгибания стоя в блоке' },
  { name: 'Ягодичный мост в Смите' },
  { name: 'Обратная гиперэкстензия' },
  { name: 'Отведение бедра' },
  { name: 'Приподнятые приседания' },
  { name: 'Становая тяга на прямых ногах' },
  { name: 'Подъем на носки в Смите' },
  { name: 'Подъем на носки в тренажере' },
  { name: 'Подъем на носки стоя с гантелей' },
]

export const exerciseRoutes: Plugin<FastifyInstance, IncomingMessage, ServerResponse, any> = (server, opts, next) => {
  server.get('/', (req, reply) => {
    reply.send(DEFAULT_EXERCISE_LIST)
  })

  server.get('/:id', (req, reply) => {
    reply.send({
      hello: req.params.id,
    })
  })

  server.post('/', (req, reply) => {
    reply.send({
      hello: 'created',
    })
  })

  next()
}
