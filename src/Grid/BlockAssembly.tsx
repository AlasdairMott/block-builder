import { Block, BlockProps } from "./Block";

export type BlockAssemblyProps = {
    blocks: BlockProps[];
}

export const BlockAssembly: React.FC<BlockAssemblyProps> = (props) => {
    return (
        <>
            {props.blocks.map((block) => {
                return (
                    <Block
                        key= {block.id}
                        id = {block.id}
                        position={block.position}
                        rotation={block.rotation}
                    />
                );
            })}
        </>
    );
};