import { type NextApiHandler } from 'next';
interface Config {
    enableHealth: boolean;
    enableMetrics: boolean;
    enableInfo: boolean;
    healthEndpoint: string;
    metricsEndpoint: string;
    infoEndpoint: string;
}
export declare function nextActuator(config?: Partial<Config>): NextApiHandler;
export default nextActuator;
