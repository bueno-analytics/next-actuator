import * as httpMocks from 'node-mocks-http'
import nextActuator from '.'

describe('nextActuator', () => {
  describe('404', () => {
    const actuator = nextActuator()

    it('returns 404 for no endpoint matched', async () => {
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/nope'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(404)
    })

    it('returns 404 if no url is available', async () => {
      const { req, res } = httpMocks.createMocks({
        method: 'GET'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(404)
    })
  })

  describe('200', () => {
    const actuator = nextActuator()

    test('/health', async () => {
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/health'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(200)
      expect(res._getData()).toEqual({ status: 'UP' })
    })

    test('/info', async () => {
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/info'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(200)

      const data = res._getData()
      expect(data.build).not.toBeUndefined()
    })

    test('/metrics', async () => {
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/metrics'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(200)

      const data = res._getData()
      expect(data.mem).not.toBeUndefined()
      expect(data.uptime).not.toBeUndefined()
    })
  })

  describe('config', () => {
    it('returns 404 with endpoints disabled', async () => {
      const actuator = nextActuator({
        enableHealth: false
      })
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/health'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(404)
    })

    it('returns 200 when a custom endpoint is set', async () => {
      const actuator = nextActuator({
        healthEndpoint: '/health-endpoint'
      })
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/health-endpoint'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(200)
    })

    it('returns 404 when a custom endpoint is set', async () => {
      const actuator = nextActuator({
        healthEndpoint: '/health-endpoint'
      })
      const { req, res } = httpMocks.createMocks({
        method: 'GET',
        url: '/actuator/health'
      })

      await actuator(req, res)

      expect(res._getStatusCode()).toBe(404)
    })
  })
})
