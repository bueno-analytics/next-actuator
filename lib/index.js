import { getPackageJson } from './lib/get-package-json';
export function nextActuator(config = {}) {
    const { enableHealth = true, enableMetrics = true, enableInfo = true, healthEndpoint = '/health', metricsEndpoint = '/metrics', infoEndpoint = '/info' } = config;
    return async (req, res) => {
        if (req.url == null) {
            res.status(404).end();
            return;
        }
        if (enableHealth && req.url.endsWith(healthEndpoint)) {
            res.status(200).send({ status: 'UP' });
            return;
        }
        if (enableInfo && req.url.endsWith(infoEndpoint)) {
            res.status(200).send({
                build: await getPackageJson()
                // git: {}
            });
            return;
        }
        if (enableMetrics && req.url.endsWith(metricsEndpoint)) {
            res.status(200).send({
                mem: process.memoryUsage(),
                uptime: process.uptime()
            });
            return;
        }
        res.status(404).end();
    };
}
export default nextActuator;
