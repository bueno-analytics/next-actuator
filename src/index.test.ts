import { testApiHandler } from 'next-test-api-route-handler'
import { describe, expect, it, test } from 'vitest'
import nextActuator from '.'

describe('nextActuator', () => {
  describe('404', () => {
    const actuator = nextActuator()

    it('returns 404 for no endpoint matched', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/nope',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(404)
        }
      })
    })

    it('returns 404 if no url is available', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(404)
        }
      })
    })
  })

  describe('200', () => {
    const actuator = nextActuator()

    test('/health', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/health',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(200)
          const data = await res.json()
          expect(data).toEqual({ status: 'UP' })
        }
      })
    })

    test('/info', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/info',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(200)
          const data = await res.json()
          expect(data.build).not.toBeUndefined()
        }
      })
    })

    test('/metrics', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/metrics',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(200)
          const data = await res.json()
          expect(data.mem).not.toBeUndefined()
          expect(data.uptime).not.toBeUndefined()
        }
      })
    })
  })

  describe('http methods', () => {
    const actuator = nextActuator()

    test('returns 404 when method other than GET is used', async () => {
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/health',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'POST' })
          expect(res.status).toBe(404)
        }
      })
    })
  })

  describe('config', () => {
    it('returns 404 with endpoints disabled', async () => {
      const actuator = nextActuator({
        enableHealth: false
      })
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/health',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(404)
        }
      })
    })

    it('returns 200 when a custom endpoint is set', async () => {
      const actuator = nextActuator({
        healthEndpoint: '/health-endpoint'
      })
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/health-endpoint',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(200)
        }
      })
    })

    it('returns 404 when a custom endpoint is set', async () => {
      const actuator = nextActuator({
        healthEndpoint: '/health-endpoint'
      })
      await testApiHandler({
        pagesHandler: actuator,
        url: '/actuator/health',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' })
          expect(res.status).toBe(404)
        }
      })
    })
  })
})
