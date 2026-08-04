"use client";
import { useContext, useState } from "react";
import {
  useBuscarBanners,
  useCriarBanner,
  useDeletarBanner,
  useEditarBanner,
} from "@/hooks/bannerHooks";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
} from "antd";
import {
  BiImageAdd,
  BiPencil,
  BiShow,
  BiTrash,
  BiUpload,
  BiX,
} from "react-icons/bi";
import { AntContext } from "@/contexts/AntContext";
import { useBuscarCategorias } from "@/hooks/categoriaHooks";
import Image from "next/image";

const AdminBanner = () => {
  const { data: banners } = useBuscarBanners();
  const { data: categorias, isFetched: categoriasListadas } =
    useBuscarCategorias();
  const [drawerCriar, setDrawerCriar] = useState(false);
  const [drawerEditar, setDrawerEditar] = useState(false);
  const [drawerImagem, setDrawerImagem] = useState(false);
  const { mutateAsync: criarBanner } = useCriarBanner();
  const { mutateAsync: editarBanner } = useEditarBanner();
  const { mutateAsync: deletarBanner } = useDeletarBanner();
  const { api } = useContext(AntContext);
  const [formEditar] = Form.useForm();
  const [formImagem] = Form.useForm();
  const [bannerSelecionado, setBannerSelecionado] = useState(null);

  function criar(dados) {
    criarBanner(dados, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
    });
  }

  function editar(dados) {
    editarBanner(dados, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerEditar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerEditar(false);
      },
    });
  }
  
  function deletar(id) {
    deletarBanner(id, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
    });
  }

  function adicionarImagem(dados) {
    criarBanner(dados, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
        setDrawerCriar(false);
      },
    });
  }

  function removerImagem(id) {
    deletarImagem(id, {
      onSuccess: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
      },
      onError: (resposta) => {
        api[resposta.tipo]({
          description: resposta.mensagem,
        });
      },
    });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2>Banners</h2>
        <Button type="primary" onClick={() => setDrawerImagem(true)}>
          Novo banner
        </Button>
      </div>
      <Table dataSource={banners || []} rowKey={"id"}>
        <Table.Column className="w-15" dataIndex={"id"} title={"id"} key={"id"} />
        <Table.Column className="w-26" title={"imagem"} render={(_, banner) => (
            <img src={banner.imagem} width={80} height={50}/>
        )} />
        <Table.Column dataIndex={"link"} title={"link"} key={"link"} />
        <Table.Column
          className="w-[100px]"
          title="ações"
          render={(_, banner) => (
            <div className="flex gap-3">
              <Button
                icon={<BiImageAdd />}
                onClick={() => {
                  formImagem.setFieldValue("id_banner", banner.id);
                  setDrawerImagem(true);
                  setBannerSelecionado(banner);
                }}
              />
              <Button
                icon={<BiPencil />}
                onClick={() => {
                  formEditar.setFieldsValue({
                    id: banner.id,
                    link: banner.link
                  });
                  setDrawerEditar(true);
                }}
              />
              <Popconfirm
                title="Aviso"
                description="Deseja apagar esse registro?"
                onConfirm={() => deletar(banner.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button icon={<BiTrash />} />
              </Popconfirm>
            </div>
          )}
        />
      </Table>

      <Drawer open={drawerEditar} onClose={() => setDrawerEditar(false)}>
        <Form
          layout="vertical"
          defaultValue={{ tamanho: "PP" }}
          form={formEditar}
          encType="multipart/form-data"
          onFinish={editar}
        >

          <Form.Item hidden name={"id"}>
            <Input/>
          </Form.Item>

          <Form.Item name={"link"} label="Link" rules={[{ required: true, message: "Campo obrigatório" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={"Imagem"}
            name={"imagem"}
            valuePropName="filelist"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.target?.files?.[0];
            }}
          >
            <Input type="file" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form>
      </Drawer>

      <Drawer open={drawerImagem} onClose={() => setDrawerImagem(false)}>
        <div className="grid grid-cols-2 gap-4">
          {bannerSelecionado && (        
              <div
                key={bannerSelecionado.id}
                className="p-3 rounded border border-slate-300 mb-4 "
              >
                <div className="flex justify-end">
                  <Popconfirm
                    title="Aviso!"
                    description="Deseja realmente apagar essa imagem?"
                    okText="Sim"
                    cancelText="Não"
                    onConfirm={() => {
                      removerImagem(bannerSelecionado.id);
                    }}
                  >
                    <BiX className="text-2xl cursor-pointer" />
                  </Popconfirm>
                </div>
                <img src={bannerSelecionado.imagem} alt="" className="w-full" />
              </div>
            )}
        </div>

        <Form
          layout="vertical"
          defaultValue={{ tamanho: "PP" }}
          form={formImagem}
          encType="multipart/form-data"
          onFinish={adicionarImagem}
        >

          <Form.Item name={"link"} label="Link" rules={[{ required: true, message: "Campo obrigatório" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={"Imagem"}
            name={"imagem"}
            rules={[{ required: true, message: "Campo obrigatório" }]}
            valuePropName="filelist"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.target?.files?.[0];
            }}
          >
            <Input type="file" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Adicionar
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AdminBanner;
