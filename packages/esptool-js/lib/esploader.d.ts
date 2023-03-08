import { Transport } from "./webserial";
import { ROM } from "./targets/rom";
export interface IEspLoaderTerminal {
    clean: () => void;
    writeLine: (data: string) => void;
    write: (data: string) => void;
}
export declare class ESPLoader {
    transport: Transport;
    private baudrate;
    private terminal?;
    private rom_baudrate;
    private debugLogging;
    ESP_RAM_BLOCK: number;
    ESP_FLASH_BEGIN: number;
    ESP_FLASH_DATA: number;
    ESP_FLASH_END: number;
    ESP_MEM_BEGIN: number;
    ESP_MEM_END: number;
    ESP_MEM_DATA: number;
    ESP_WRITE_REG: number;
    ESP_READ_REG: number;
    ESP_SPI_ATTACH: number;
    ESP_CHANGE_BAUDRATE: number;
    ESP_FLASH_DEFL_BEGIN: number;
    ESP_FLASH_DEFL_DATA: number;
    ESP_FLASH_DEFL_END: number;
    ESP_SPI_FLASH_MD5: number;
    ESP_ERASE_FLASH: number;
    ESP_ERASE_REGION: number;
    ESP_RUN_USER_CODE: number;
    ESP_IMAGE_MAGIC: number;
    ESP_CHECKSUM_MAGIC: number;
    ROM_INVALID_RECV_MSG: number;
    ERASE_REGION_TIMEOUT_PER_MB: number;
    ERASE_WRITE_TIMEOUT_PER_MB: number;
    MD5_TIMEOUT_PER_MB: number;
    CHIP_ERASE_TIMEOUT: number;
    MAX_TIMEOUT: number;
    CHIP_DETECT_MAGIC_REG_ADDR: number;
    DETECTED_FLASH_SIZES: {
        [key: number]: string;
    };
    USB_JTAG_SERIAL_PID: number;
    chip: ROM;
    IS_STUB: boolean;
    FLASH_WRITE_SIZE: number;
    constructor(transport: Transport, baudrate: number, terminal?: IEspLoaderTerminal | undefined, rom_baudrate?: number, debugLogging?: boolean);
    _sleep(ms: number): Promise<unknown>;
    write(str: string, withNewline?: boolean): void;
    error(str: string, withNewline?: boolean): void;
    info(str: string, withNewline?: boolean): void;
    debug(str: string, withNewline?: boolean): void;
    _short_to_bytearray(i: number): Uint8Array;
    _int_to_bytearray(i: number): Uint8Array;
    _bytearray_to_short(i: number, j: number): number;
    _bytearray_to_int(i: number, j: number, k: number, l: number): number;
    _appendBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBufferLike;
    _appendArray(arr1: Uint8Array, arr2: Uint8Array): Uint8Array;
    ui8ToBstr(u8Array: Uint8Array): string;
    bstrToUi8(bStr: string): Uint8Array;
    flush_input(): Promise<void>;
    command(op?: number | null, data?: Uint8Array, chk?: number, waitResponse?: boolean, timeout?: number): Promise<[number, Uint8Array]>;
    read_reg(addr: number, timeout?: number): Promise<number>;
    write_reg(addr: number, value: number, mask?: number, delay_us?: number, delay_after_us?: number): Promise<void>;
    sync(): Promise<[number, Uint8Array]>;
    _connect_attempt(mode?: string, esp32r0_delay?: boolean): Promise<"error" | "success">;
    connect(mode?: string, attempts?: number, detecting?: boolean): Promise<void>;
    detect_chip(mode?: string): Promise<void>;
    check_command(op_description?: string, op?: number | null, data?: Uint8Array, chk?: number, timeout?: number): Promise<number | Uint8Array>;
    mem_begin(size: number, blocks: number, blocksize: number, offset: number): Promise<void>;
    checksum: (data: Uint8Array) => number;
    mem_block(buffer: Uint8Array, seq: number): Promise<void>;
    mem_finish(entrypoint: number): Promise<void>;
    flash_spi_attach(hspi_arg: number): Promise<void>;
    timeout_per_mb: (seconds_per_mb: number, size_bytes: number) => number;
    flash_begin(size: number, offset: number): Promise<number>;
    flash_defl_begin(size: number, compsize: number, offset: number): Promise<number>;
    flash_block(data: Uint8Array, seq: number, timeout: number): Promise<void>;
    flash_defl_block(data: Uint8Array, seq: number, timeout: number): Promise<void>;
    flash_finish(reboot?: boolean): Promise<void>;
    flash_defl_finish(reboot?: boolean): Promise<void>;
    run_spiflash_command(spiflash_command: number, data: Uint8Array, read_bits: number): Promise<number>;
    read_flash_id(): Promise<number>;
    erase_flash(): Promise<number | Uint8Array>;
    toHex(buffer: number | Uint8Array): string;
    flash_md5sum(addr: number, size: number): Promise<string>;
    run_stub(): Promise<ROM>;
    change_baud(): Promise<void>;
    main_fn(mode?: string): Promise<string>;
    flash_size_bytes: (flash_size: string) => number;
    parse_flash_size_arg(flsz: string): number;
    _update_image_flash_params(image: string, address: number, flash_size: string, flash_mode: string, flash_freq: string): string;
    write_flash(fileArray: {
        data: string;
        address: number;
    }[], flash_size?: string, flash_mode?: string, flash_freq?: string, erase_all?: boolean, compress?: boolean, reportProgress?: (fileIndex: number, written: number, total: number) => void, calculateMD5Hash?: (image: string) => string): Promise<void>;
    flash_id(): Promise<void>;
    hard_reset(): Promise<void>;
    soft_reset(): Promise<void>;
}
