import type { ComponentType } from "react";
import { Card, Text } from "@sanity/ui";

/** Explica a aba do plugin Mux: biblioteca de ficheiros, não a página do site. */
export function withVideoLibraryHelp<P extends object>(Tool: ComponentType<P>) {
  return function VideoLibraryTool(props: P) {
    return (
      <div style={{ height: "100%", overflow: "auto" }}>
        <Card padding={4} borderBottom>
          <Text size={1}>
            Esta aba guarda os ficheiros de vídeo já enviados. Não escolhe em que página eles
            aparecem. Para publicar um vídeo, abra o projeto e adicione um bloco Vídeo em Conteúdo.
          </Text>
        </Card>
        <Tool {...props} />
      </div>
    );
  };
}
