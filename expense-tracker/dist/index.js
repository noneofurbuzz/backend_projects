#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
program
    .name('expense-tracker')
    .description('track your expenses')
    .version('1.0.0');
program
    .parse(process.argv);
//# sourceMappingURL=index.js.map